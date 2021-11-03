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
 