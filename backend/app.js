var express = require('express');
var bodyParse = require('body-parser');


var app = express();
var api = require('./routes/material');

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use('/api', api);


module.exports = app;