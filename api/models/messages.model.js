const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true,
    },
    content:{
        type:String,
        required: function(){
            return this.messageType === "text"
        }
    },
    fileUrl: {
        type:String,
        required: function(){
            return this.messageType === "file"
        }
    },
    isDeleted:{
        type: Boolean,
        default: false,
    }
},{timestamps: true})

const Message = mongoose.model("message" , messageSchema);

module.exports = Message;