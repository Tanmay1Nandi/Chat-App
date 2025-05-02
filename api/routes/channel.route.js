const express = require("express");
const verifyUser = require("../utils/verification");
const { createChannel, searchContacts } = require("../controllers/channel.controller");

const router = express.Router();

router.post("/create", verifyUser, createChannel);
router.post('/search', verifyUser, searchContacts);

module.exports = router;
