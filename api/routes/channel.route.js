const express = require("express");
const verifyUser = require("../utils/verification");
const { createChannel, searchContacts, getUserChannels } = require("../controllers/channel.controller");

const router = express.Router();

router.post("/create", verifyUser, createChannel);
router.post('/search', verifyUser, searchContacts);
router.get('/get-channels', verifyUser, getUserChannels);

module.exports = router;
