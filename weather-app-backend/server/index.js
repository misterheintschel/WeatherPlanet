const express = require("express");

const PORT = process.env.PORT || 9000;

const app = express();
var data = {message:"Hello"}
var str = JSON.stringify()

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});


app.get("/api", (req, res) => {
  res.json({message:"Hello"});
});


app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
