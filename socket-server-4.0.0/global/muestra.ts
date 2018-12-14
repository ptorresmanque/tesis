import {Document, model, Model, Schema} from 'mongoose';

export const MuestraSchema = new Schema({
    Temperatura: String,
    Humedad: String,
    PM10: String,
    PM25: String,
    Lat: String,
    Long: String,
    date: { type: Date, default: Date.now }
});

