const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const Message = require("../models/messages.model");

const searchContacts = async(req, res, next) => {
    try {
        const {searchTerm} = req.body;

        if(!searchTerm){
            return next(errorHandler(400, "Search Term is required"))
        }

        const sanitizedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                {_id: {$ne: req.userId}},
                {
                    $or: [{firstName: regex}, {lastName: regex}, {email: regex}]
                }
            ]
        });

        return res.status(200).json({contacts});
    } catch (error) {
        next(error);
    }
}

const getContactsForDmList = async(req, res, next) => {
    try {
        let userId = req.user.id;
        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match:{
                    $or:[{sender: userId}, {recipient: userId}],
                },
            },
            {
                $sort:{createdAt : -1},
            },
            {
                $group:{
                    _id:{
                        $cond:{
                            if:{$eq:["$sender", userId]},
                            then: "$recipient",
                            else: "$sender",
                        }
                    },
                    lastMessageTime: {$first: "$createdAt"},
                },
            },
            {
                $lookup:{
                    from:"users",
                    localField:"_id",
                    foreignField:"_id",
                    as:"contactInfo",
                }
            },
            {
                $unwind:"$contactInfo"
            },
            {
                $project:{
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    image: "$contactInfo.profilePicture"
                }
            },
            {
                $sort: {lastMessageTime: -1},
            }
        ])

        return res.status(200).json({contacts});
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// const getAllContacts = async(req, res, next) => {
//     try {
//         const users = await User.find({_id:{$ne : req.user.id}}, "firstName lastName _id email");

//         const contacts = users.map((user) => [{
//             label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
//         }])

//         return res.status(200).json({contacts});
//     } catch (error) {
//         next(error);
//     }
// }

const getAllContacts = async (req, res, next) => {
    try {
      const users = await User.find(
        { _id: { $ne: req.user.id } },
        "firstName lastName _id email profilePicture" // fetch profilePicture too
      );
  
      const contacts = users.map((user) => ({
        value: user._id,
        label: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email,
        email: user.email,
        profilePicture: user.profilePicture || null, // optional
      }));
  
      return res.status(200).json({ contacts });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    searchContacts,
    getContactsForDmList,
    getAllContacts
}