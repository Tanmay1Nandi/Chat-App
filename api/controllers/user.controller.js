const User = require("../models/user.model");

const handleUpdate = async(req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "You are not allowed to update this user"))
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set: {
                profilePicture: req.body.profilePicture,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },
        },{new: true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(error){
        next(error);
    }
}

const verifyCurrentUser = (req, res, next) => {
    if(req.user.id !== null){
        return res.status(200).json("User Exists");
    }
    else{
        return res.status(404).json("Unauthorized");
    }
}

module.exports = {
    handleUpdate,
    verifyCurrentUser
}