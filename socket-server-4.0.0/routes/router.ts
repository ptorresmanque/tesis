
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import {Document, model, Model, Schema} from 'mongoose';
import { MuestraSchema } from '../global/muestra';
import { Mymuestra } from '../interfaces/muestra';


var muestraModel: Model<Mymuestra> = model<Mymuestra>('Muestra', MuestraSchema);

const router = Router();



router.post('/saveMuestra', (req: Request, res: Response) =>{
    var muestra = new muestraModel();
    var params = req.body;

    const server = Server.instance;
    

    muestra.Temperatura = params.Temperatura;
    muestra.Humedad = params.Humedad;
    muestra.PM10 = params.PM10;
    muestra.PM25 = params.PM25;
    muestra.Lat = params.Lat;
    muestra.Long = params.Long;

    muestra.save((err, muestraStored) =>{
        if (err) {
            res.status(500).send({ message: 'erro al guardar la muestra en la sopa du macaco es uma delicia' });
        } else {
            res.status(200).send({ muestra: muestraStored })
            server.io.emit('nuevo-dato', muestraStored);
        }  
    });

    

    

});

router.get('/muestras', ( req: Request, res: Response  ) => {

    muestraModel.find({}).sort('-date').limit(1000).exec((err, muestras) => {
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
});



router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload );


    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload = {
        de,
        cuerpo
    }


    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );


    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (  req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( ( err: any, clientes: string[] ) => {

        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            clientes
        });


    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

    
});






export default router;


