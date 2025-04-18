const express = require("express");
const {handleSignup, handleLogin, handleGoogleLogin} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/google", handleGoogleLogin);

module.exports = router;