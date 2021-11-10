const express = require('express');
const db = require('./queries');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;


var data = {message:"Hello"}
var str = JSON.stringify()




app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended:true
  })
)

app.post('/user', db.getUser);

app.post('/register', db.registerUser);

app.get('/api', (req, res) => {
  res.json({message:"Hello"});
});

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
