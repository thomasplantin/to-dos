const express = require("express");
const path = require("path");
const pbkdf2 = require("pbkdf2");

const router = express.Router();

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views', 'home.html'));
});

router.get('/makelist', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views', 'makelist.html'));
});

router.get('/mylists', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/views', 'mylists.html'));
});

module.exports = router;