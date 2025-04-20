const express = require("express");
const { handleUpdate } = require("../controllers/user.controller");
const verify = require("../utils/verification")

const router = express.Router();

router.put("/update/:userId",verify, handleUpdate);

module.exports = router;