const Message = require("../models/messages.model");
const {mkdirSync, renameSync} = require("fs");
const errorHandler = require("../utils/error");

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

// const uploadFile = async(req, res, next) => {
//     try {
//         if(!req.file){
//             return next(errorHandler(400, "File is required"));
//         }
//         const date = Date.now();
//         let fileDir = `uploads/files/${date}`;
//         let fileName = `${fileDir}/${req.file.originalname}`;

//         mkdirSync(fileDir, {recursive: true});

//         renameSync(req.file.path, fileName)

//         return res.status(200).json({ filePath: fileName});
//     } catch (error) {
//         next(error);
//     }
// }

const cloudinary = require("../utils/cloudinary");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "File is required"));
    }

    // Upload to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "chat-files", // optional folder in your Cloudinary
    //   resource_type: "auto", // auto detects if image/video/file
    // });

    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    let resourceType = "auto";
    if (["pdf", "zip", "rar", "7z", "doc", "docx", "txt"].includes(fileExtension)) {
      resourceType = "raw";
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chat-files",
      resource_type: resourceType,
    });

    // Send back Cloudinary URL
    // return res.status(200).json({ filePath: result.secure_url });

    return res.status(200).json({ 
        filePath: result.secure_url, 
        fileType: result.resource_type, // image, raw, video
        publicId: result.public_id // helpful if you want delete later
      });

  } catch (error) {
    next(error);
  }
}

const deleteMessages = async (req, res, next) => {
    try {
      const { messageId } = req.body;
  
      if (!messageId) {
        return next(errorHandler(400, "Message ID is required"));
      }
  
    //   const message = await Message.findById(messageId);
      const message = await Message.findByIdAndUpdate(messageId, { isDeleted: true });
      if (!message) {
        return next(errorHandler(404, "Message not found"));
      }
  
      await message.deleteOne();
  
      return res.status(200).json({ success: true, message: "Message deleted" });
  
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    uploadFile,
    getMessages,
    deleteMessages,
}