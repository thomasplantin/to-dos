const express = require('express');
var path = require('path');
const morgan = require('morgan');

// Import constants from config.js
const info = require('./config.js');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/static')));

// Import my routes
const routerSignup = require('./back-end/routes/auth_route.js');
app.use(routerSignup);
const routerHome = require('./back-end/routes/home_route.js');
app.use(routerHome);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

app.get('/', (req, res) => {
  // Returns the root page of the project
  res.render("signup.html")
});

app.listen(process.env.PORT || info.PORT, () => {
  console.log('[INFO] Listening on port ' + info.PORT + '...');
});