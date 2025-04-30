const express = require("express");
const verifyUser = require("../utils/verification");
const { getMessages, uploadFile } = require("../controllers/messages.controller");

const multer = require("multer");
const upload = multer({dest: "uploads/files"});

const router = express.Router();

router.post("/get-messages", verifyUser, getMessages);
router.post("/upload-file", verifyUser, upload.single("file"), uploadFile);

module.exports = router;