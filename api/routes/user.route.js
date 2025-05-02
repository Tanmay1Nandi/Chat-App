const express = require("express");
const { handleUpdate, verifyCurrentUser} = require("../controllers/user.controller");
const verify = require("../utils/verification");
const verifyEmail = require("../utils/nodeMailer");
const { clickToVerifyEmail } = require("../controllers/auth.controller");
const verifyOtp = require("../utils/verifyOtp");
const verifyUser = require("../utils/verification");

const router = express.Router();

router.put("/update/:userId",verify, handleUpdate);
// router.get("/verifyEmail/:userId", verifyEmail);
router.get("/verifyEmail/:email", verifyEmail);
// router.get("/clickToVerifyEmail/:userId", clickToVerifyEmail);
router.post("/verifyOTP", verifyOtp);

router.get("/verify",verifyUser, verifyCurrentUser);

module.exports = router;