'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MuestraSchema = Schema({
    Temperatura: String,
    Humedad: String,
    PM10: String,
    PM25: String,
    Lat: String,
    Long: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Muestra', MuestraSchema);