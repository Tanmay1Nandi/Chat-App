const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receipent:{
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
},{timestamps: true})

const Message = mongoose.Model("message" , messageSchema);

module.exports = Message;