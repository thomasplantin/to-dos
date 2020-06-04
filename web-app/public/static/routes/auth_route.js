const express = require("express");
const path = require("path");
const pbkdf2 = require("pbkdf2");

const router = express.Router();

const info = require('../../../config.js');

router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views', 'auth.html'));
});

module.exports = router;