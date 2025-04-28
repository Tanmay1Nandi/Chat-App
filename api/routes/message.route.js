const express = require("express");
const verifyUser = require("../utils/verification");
const { getMessages } = require("../controllers/messages.controller");

const router = express.Router();

router.post("/get-messages", verifyUser, getMessages);

module.exports = router;