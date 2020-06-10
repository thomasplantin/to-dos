const express = require("express");
const path = require("path");
const pbkdf2 = require("pbkdf2");

const router = express.Router();

const info = require('./../../config.js');


router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views', 'login.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views', 'signup.html'));
});

module.exports = router;