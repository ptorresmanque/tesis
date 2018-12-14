import {Document} from 'mongoose';



export interface Mymuestra extends Document{
    Temperatura: String,
    Humedad: String,
    PM10: String,
    PM25: String,
    Lat: String,
    Long: String,
    date: Date
}