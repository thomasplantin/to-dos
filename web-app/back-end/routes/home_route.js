const express = require("express");
const path = require("path");
const pbkdf2 = require("pbkdf2");

const router = express.Router();

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views', 'home.html'));
});

module.exports = router;