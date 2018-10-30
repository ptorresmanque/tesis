var express = require('express');
var bodyParse = require('body-parser');


var app = express();
var api = require('./routes/material');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use('/api', api);


module.exports = app;