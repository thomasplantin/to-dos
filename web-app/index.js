const express = require('express');
var path = require('path');
const morgan = require('morgan');

// Import constants from config.js
const {
  PORT,
} = require('./config.js');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));

// Import my routes
const routerSignup = require('./public/static/routes/auth_route.js');
app.use(routerSignup);
const routerHome = require('./public/static/routes/home_route.js');
app.use(routerHome);

app.get('/', (req, res) => {
  // Returns the root page of the project
  res.sendFile('index.html');
});

app.post('/auth', (req, res) => {
  res.sendFile(__dirname + '/public/views/auth.html');
});

app.listen(PORT, () => {
    console.log('[INFO] Listening on port ' + PORT + '...');
});