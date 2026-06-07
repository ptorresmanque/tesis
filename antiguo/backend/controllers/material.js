'use strict'

var Muestra = require('../models/muestra');



function saveMuestra(req, res) {
    var muestra = new Muestra();
    var params = req.body;

    muestra.Temperatura = params.Temperatura;
    muestra.Humedad = params.Humedad;
    muestra.PM10 = params.PM10;
    muestra.PM25 = params.PM25;
    muestra.Lat = params.Lat;
    muestra.Long = params.Long;

    muestra.save((err, muestraStored) => {
        if (err) {
            res.status(500).send({ message: 'erro al guardar la muestra en la sopa du macaco es uma delicia' });
        } else {
            res.status(200).send({ muestra: muestraStored })
        }
    });
}

function getMuestras(req, res) {
    Muestra.find({}).sort('-date').exec((err, muestras) => {
        if (err) {
            res.status(500).send({ message: 'erro al devolver las muestras en la sopa du macaco es uma delicia' });
        } else {
            if (!muestras) {
                res.status(404).send({ message: 'no hay muestras' });
            } else {
                res.status(200).send({ muestras });
            }
        }
    });
}


module.exports = {
    saveMuestra,
    getMuestras
}