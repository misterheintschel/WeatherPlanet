require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./queries');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const helmet = require('helmet');
const fs = require('fs');
const cors = require('cors');
var http = express();
const app = express();

const options = {
  key:fs.readFileSync(process.env.SSL_KEY),
  cert:fs.readFileSync(process.env.SSL_CERT),
  ca:fs.readFileSync(process.env.SSL_CA)
};

const contentSecurityPolicy = [
  "default-src 'self' https://weatherplanet-icons.s3.amazonaws.com https://fonts.googleapis.com https://api.openweathermap.org https://fonts.gstatic.com",
  "script-src 'self' 'unsafe-inline' https://api.openweathermap.org https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
  "img-src 'self' 'unsafe-inline' https://weatherplanet-icons.s3.amazonaws.com",
].join(";");



const httpsServer = https.createServer(options, app);


app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", contentSecurityPolicy);
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

http.get('/*' function(req,res) {
  res.redirect('https://' + req.headers.host + req.url);
});
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

app.post('/citySearch', db.citySearch);

http.listen(80);

httpsServer.listen(443, ()=>{
  console.log('Server listening on port 443');
});
