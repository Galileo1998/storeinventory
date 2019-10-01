var fileModel = require('../filemodel');
var express = require('express');
var router = express.Router();


var krdCollection = [];

fileModel.loadFromFileKardex(
  function(err, savedCollection)
  {
      if(err)
      {
          return;
      }
      krdCollection = savedCollection;
      return;
  }
);


router.get('/', function (req, res) {
  res.json({
    "entity": "kardex",
    "version": "0.0.1"
  });
}); //get

/** 
 * get      Consultas     select
 * post     Crear         insert
 * put      Actualizar    update
 * delete   Eliminar      delete
*/

router.get('/all', function(req, res){
  res.json(krdCollection);
}); // get /all

 
    router.post('/new', function(){
        var newKardex = Object.assign(
        {},
        req.body,
        {
            "stock": parseInt(req.body.stock),
            "price": parseFloat(req.body.price)
        }
        );
        var kardexExists = krdCollection.find(
        function(o, i){
            return o.sku === newKardex.sku;
        }
        )
        if( ! kardexExists ){
        krdCollection.push(newKardex);
        fileModel.saveToFileKardex(
            krdCollection,
            function(err, savedSuccesfully){
            if(err)
            {
                res.status(400).json({ "error": "No se pudo ingresar objeto" });
            } else
            {
                res.json(newKardex);  // req.body ===  $_POST[]    
            }
            }
        );
        } else {
        res.status(400).json({"error":"No se pudo ingresar objeto"});
        }
    }); // post /new
}
// post /new

// endPoint ==  ejeutar operacion| obtenerRecurso| guardarrecurso 
//              | > devuelve un recurso

// router  get| post | put | delete

module.exports = router;
