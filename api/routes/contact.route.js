const express = require("express");
const verifyUser = require("../utils/verification");
const { searchContacts, getContactsForDmList } = require("../controllers/contact.controller");

const router = express.Router();

router.post("/search", verifyUser, searchContacts);
router.get("/get-contacts-for-dm", verifyUser, getContactsForDmList),

module.exports = router;