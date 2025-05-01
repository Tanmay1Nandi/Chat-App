// backend/routes/files.js
const express = require('express');
const { getSignedUrl } = require('../controllers/files.controller');
const router = express.Router();

router.post('/get-signed-url', getSignedUrl);

module.exports = router;
