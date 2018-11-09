'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3678;

mongoose.connect('mongodb://localhost:27017/PM', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('cargo bn macaco db uma delicia');
        app.listen(3678, function() {
            console.log(`api rest sensore too locos en http://localhost:${port}`);
        });
    }
});