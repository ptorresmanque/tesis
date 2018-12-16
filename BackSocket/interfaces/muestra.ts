import {Document} from 'mongoose';



export interface Mymuestra extends Document{
    Temperatura: Number,
    Humedad: Number,
    PM10: Number,
    PM25: Number,
    Lat: Number,
    Long: Number,
    date: Date
}