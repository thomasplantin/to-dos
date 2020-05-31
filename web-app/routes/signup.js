const express = require("express");
const path = require("path");
const pbkdf2 = require("pbkdf2");

const router = express.Router();

const {
  SALT
} = require('./../config.js');

module.exports = router;