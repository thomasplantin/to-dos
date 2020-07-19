const express = require("express");
const path = require("path");

const router = express.Router();

router.get('/home', (req, res) => {
  res.render("home.html");
});

router.get('/makelist', (req, res) => {
  res.render("makelist.html");
});

router.post('/makelist', (req, res) => {
  res.render("makelist.html");
});

router.get('/mylists', (req, res) => {
  res.render("mylists.html");
});

router.get('/listview/:listTitle', (req, res) => {
  console.log(req.params);
  res.render("listview.html", req.params);
});

module.exports = router;