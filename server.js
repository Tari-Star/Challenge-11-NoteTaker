const express = require('express');
const fs = require('fs');
const path = require('path');

//setup express app
 const app = express();
 const PORT = process.env.PORT || 3001;

 //handle data parsing
 app.use(express.urlencoded({ extended: true}));
 app.use(express.json());
 
 // html routes
 app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
