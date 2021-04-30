const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const fs = require('fs');

var jp = require('jsonpath')


var object = () =>{
}

app.get('/CreateForm', function(req, res,next) {
  object()
  next()
});

app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.static(path.join(__dirname, "..", "public/jsonObjects")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


app.listen(port, () => {
  console.log("server started on port 3000");
});