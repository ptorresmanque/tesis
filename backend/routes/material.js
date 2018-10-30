'use strict'

var express = require('express');
var MaterialController = require('../controllers/material');

var api = express.Router();

api.get('/prueba/', MaterialController.Prueba);

module.exports = api;