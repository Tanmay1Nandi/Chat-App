const User = require("../models/user.model");
const errorHandler = require("./error");

const verifyOtp = async (req, res, next) => {
    try {
        const validUser = await User.findOne({email: req.body.email});
        if(!validUser){
            next(errorHandler(404, "User not found"))
        }
        if(validUser.OTP === Number(req.body.OTP)){
            const user = await User.findOneAndUpdate({email: req.body.email},{
                $set:{isVerified: true},
                $unset:{OTP:""}
            },{new:true})
            res.status(200).json(user);
        }else{
            next(errorHandler(404, "Incorrect OTP"));
        }
    } catch (error) {
        next(error)
    }
}

module.exports = verifyOtp