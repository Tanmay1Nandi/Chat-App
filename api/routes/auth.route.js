const express = require("express");
const {handleSignup, handleLogin, handleGoogleLogin, handleUpload, handleSignout} = require("../controllers/auth.controller");

const multerMiddleware = require("../middlewares/multer");

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/google", handleGoogleLogin);
router.post("/upload", multerMiddleware.single("file"), handleUpload);
router.post("/signout", handleSignout);

module.exports = router;