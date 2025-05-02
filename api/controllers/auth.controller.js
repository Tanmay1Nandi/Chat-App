const errorHandler = require("../utils/error");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../utils/cloudinary");

const handleSignup = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password ||  email === "" || password === ""){
        return next(errorHandler(400, "All fields are required"));
    }

    //Create a hashed password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({
            email,
            password: hashedPassword,
        })

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(errorHandler(404, "User already exists"));
    }
}

const handleLogin = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password || email === "" || password === ""){
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "Email or password is wrong"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(404, "Email or password is wrong"));
        }

        const token = jwt.sign({
            email: validUser.email,
            id: validUser._id
        },process.env.SECRET,{
            expiresIn:"7d"
        })

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie("access_token", token ,{
            httpOnly: true,
            maxAge: 24*60*60*1000*365
        }).json(rest);

    } catch (error) {
        next(error);
    }
}

const handleGoogleLogin =async (req, res, next)=>{
    const {email, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true
            }).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            

            const newUser = new User({
                // username: name.toLowerCase().split(" ").join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            })

            await newUser.save();
            const token = jwt.sign({
                email: newUser.email,
                id: newUser._id,
            },process.env.SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000* 365
            }).json(rest);
        }
    } catch (error) {
        next(error)
    }
}

const handleUpload = (req, res, next)=>{
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if(err){
            return next(err);
        }
        res.status(200).json({
            success:true,
            message:"Uploaded",
            data: result,
        })
    });
}

const clickToVerifyEmail = async (req, res) => {
    const userId = req.params.userId;
    try {
        const validUser = await User.findOne({_id : userId});
        if(!validUser) {
            res.status(403).json("User not found.");
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set: {
                isVerified: true,
            },
        },{new: true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json("Successfully Verified.");
    } catch (error) {
        next(error);
    }
}


const handleSignout = async(req, res, next) => {
    try {
        res.clearCookie("access_token").status(200).json("User has been signed out.");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleSignup,
    handleLogin,
    handleGoogleLogin,
    handleUpload,
    clickToVerifyEmail,
    handleSignout
}