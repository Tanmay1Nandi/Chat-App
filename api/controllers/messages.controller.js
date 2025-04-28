const Message = require("../models/messages.model");

const getMessages = async(req, res, next) => {
    try {
        const user1 = req.user.id;
        const user2 = req.body.id;

        if(!user1 || !user2){
            return next(errorHandler(400, "Both user ID's are required"))
        }

        const messages = await Message.find({
            $or: [
                {sender: user1, recipient: user2},
                {sender: user2, recipient: user1},
            ]
        }).sort({createdAt : 1});

        return res.status(200).json({messages});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMessages
}