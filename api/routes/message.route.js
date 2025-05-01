const express = require("express");
const verifyUser = require("../utils/verification");
const { getMessages, uploadFile, deleteMessages } = require("../controllers/messages.controller");

// const multer = require("multer");
// const upload = multer({dest: "uploads/files"});

const multer = require("multer");
const upload = multer({ dest: "temp/",
    limits: {fileSize: 12*1024*1024}
 });

const router = express.Router();

router.post("/get-messages", verifyUser,(err, req, res, next) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large! Max allowed is 12MB." });
      }
      return res.status(500).json({ message: "File upload error!" });
    }
    next();
  }, getMessages);
router.post("/upload-file", verifyUser, upload.single("file"), uploadFile);
router.delete("/delete-message", verifyUser, deleteMessages);

module.exports = router;