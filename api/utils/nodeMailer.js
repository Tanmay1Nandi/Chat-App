const nodemailer = require("nodemailer");
const User = require("../models/user.model");

const verifyEmail = async (req, res, next) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        }
    });

    //Generate OTP
    const OTP = Math.floor(100000 + Math.random() * 900000);

    try {
        const updatedUser = await User.findOneAndUpdate({email: req.params.email},{
            $set:{OTP}
        },{new: true})
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }

    const receiver = {
        from : process.env.GMAIL_USER,
        to : req.params.email,
        subject: "Verify your email account",
        text: "Please click on the link below to verify your email!",
        // html: `<a href="http://localhost:8000/api/user/clickToVerifyEmail/${req.params.userId} ">Click here to verify.</a>`
        html: `<>
                <h1>Your 6 digit OTP number is:</h1>
                <h2>${OTP}</h2>
            </>`
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error){
            next(error);
        }
        res.status(200).json("Email sent.");
    })
}

module.exports = verifyEmail;