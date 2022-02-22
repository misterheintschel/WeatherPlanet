require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./queries');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const helmet = require('helmet');
const http = require('http');
const fs = require('fs');
const cors = require('cors');

const app = express();
console.log(process.env.SSL_KEY,process.env.SSL_CERT,process.env.SSL_CA);
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


const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);


app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", contentSecurityPolicy);
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

app.post('/citySearch', db.citySearch);

httpServer.listen(80, () => {
  console.log(`Server Listening on 80`);
});

httpsServer.listen(443, ()=>{
  console.log('Server listening on port 443');
});
