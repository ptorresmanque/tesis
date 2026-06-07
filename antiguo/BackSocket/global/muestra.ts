import {Document, model, Model, Schema} from 'mongoose';

export const MuestraSchema = new Schema({
    Temperatura: Number,
    Humedad: Number,
    PM10: Number,
    PM25: Number,
    Lat: Number,
    Long: Number,
    date: { type: Date, default: Date.now }
});

