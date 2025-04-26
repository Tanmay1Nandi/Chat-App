const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://tse1.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api",
    },
    color:{
        type: Number,
    },
    profileSetup:{
        type: Boolean,
        default: false,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    OTP:{
        type: Number,
        default: null,
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;