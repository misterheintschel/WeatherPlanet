require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./queries');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;

var str = JSON.stringify()

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cookieParser());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended:true
  })
);

app.post('/login', db.getUser);

app.post('/checkToken', db.checkToken);

app.post('/register', db.registerUser);

app.post('/favorite', db.addFavorite);

app.post('/getFavorites', db.getFavorites);

app.post('/removeFavorite', db.removeFavorite);

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
