'use strict'

var express = require('express');
var MaterialController = require('../controllers/material');

var api = express.Router();


api.get('/Muestras', MaterialController.getMuestras);

api.post('/saveMuestra', MaterialController.saveMuestra);

module.exports = api;