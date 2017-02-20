
var express = require('express');
var router = express.Router();

// server routes ===========================================================
// handle things like api calls
// authentication routes

//tomando el modelo
var Vuelo = require('../models/Vuelo');

router.get('/',function (req, res){
    Vuelo.find(function (err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else
            res.status(200).json(vuelos);
    });
});

//Buscar por fecha X o mas reciente
router.get('/qfecha',function(req,res){
    Vuelo.find({
      fecha_salida: {
          $gte: req.param('fecha_salida'),
          //$lt: "2020-05-01T00:00:00.000Z"
      }
    },function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });

});

//Buscar por fecha salida (DESDE, HASTA)
router.get('/qfechasalida',function(req,res){
    Vuelo.find({
      fecha_salida: {
          $gte: req.param('fecha_salida_desde'),
          $lt: req.param('fecha_salida_hasta')
      }
    },function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });

});

//Buscar por fecha llegada (DESDE, HASTA)
router.get('/qfechallegada',function(req,res){
    Vuelo.find({
      fecha_llegada: {
          $gte: req.param('fecha_llegada_desde'),
          $lt: req.param('fecha_llegada_hasta')
      }
    },function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });

});

//Lista de aerolineas
router.get('/aerolineas',function (req, res){

  var aerolineas =[
  {
    nombre: 'American Airlines',
    img: 'https://pbs.twimg.com/profile_images/1134668590/Logo_AA_Trademark_2_previewTwitter_400x400.jpg',
  },
  {
    nombre: 'Air France',
    img: 'https://pbs.twimg.com/profile_images/755761569913507841/B_UYQzKA.jpg',
  },
  {
    nombre: 'Copa Airlines',
    img: 'https://images.studentuniverse.com/new/suwebui/partnerlogos/copaairlines_partner.svg',
  },
  {
    nombre: 'Delta Airlines',
    img: 'http://i.forbesimg.com/media/lists/companies/delta-air-lines_416x416.jpg',
  }
]

  res.status(200).json(aerolineas);

    // Vuelo.find(function (err, vuelos) {
    //     if (err)
    //         res.status(500).send('Error en la base de datos');
    //     else
    //         res.status(200).json(vuelos);
    // });
});

router.get('/:id',function(req,res){
    Vuelo.findById(req.params.id,function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});

router.post('/',function(req,res){

    var vuelo1 = new Vuelo({

    aerolinea: req.body.aerolinea,
    ciudad_origen: req.body.ciudad_origen,
    ciudad_destino: req.body.ciudad_destino,
    fecha_salida: req.body.fecha_salida,
    fecha_llegada: req.body.fecha_llegada

	});

    vuelo1.save(function (error, vuelo1) {
        if (error) {
            res.status(500).send('No se ha podido agregar.');
        }
        else {
            res.status(200).json({_id: vuelo1._id});
        }
    });
});

//Modificar
router.put('/:id',function(req,res){
    Vuelo.findById(req.params.id,function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null){
              vuelo.aerolinea       = req.body.aerolinea;
              vuelo.ciudad_origen   = req.body.ciudad_origen;
              vuelo.ciudad_destino  = req.body.ciudad_destino;
              vuelo.fecha_salida    = req.body.fecha_salida;
              vuelo.fecha_llegada   = req.body.fecha_llegada;

                vuelo.save(function (error, vuelo1) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Modificado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});

// Eliminar
router.delete('/:id',function(req,res){
    Vuelo.findById(req.params.id,function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null) {
                vuelo.remove(function (error, result) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Vuelo Eliminado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa persona');
        }
    });
});

module.exports = router;
