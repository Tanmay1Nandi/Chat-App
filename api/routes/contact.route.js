const express = require("express");
const verifyUser = require("../utils/verification");
const { searchContacts } = require("../controllers/contact.controller");

const router = express.Router();

router.post("/search", verifyUser, searchContacts);

module.exports = router;