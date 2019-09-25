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


router.post('/new', function(req, res)
{
    var newKardex = Object.assign({}, req.body);
    var kardexExists = krdCollection.find(    
            function(o, i){
                return o.sku === newKardex.sku;
            }
    )
    

    if(!kardexExists)
    {
        krdCollection.push(newKardex);
        fileModel.saveToFileKardex(
            krdCollection,
            function(err, saveSuccesfully){
                if(err)
                {
                    res.status(400).json({"error": "No se pudo ingresar objeto"});
                }
                else
                {
                    res.json(newKardex);   
                }
            }
            );

    }
    else
    {
        res.status(400).json({"error": "No se pudo ingresar objeto"});
    }

    //prodCollection.push(newProduct);
    //res.json(newProduct);
});

router.put('/update/:krdsku',
function(req, res)
{
    var krdskuToModify = req.params.krdsku;
    console.log(krdskuToModify);
    res.json({"msg": "Not implemented yet"});
});
// post /new

// endPoint ==  ejeutar operacion| obtenerRecurso| guardarrecurso 
//              | > devuelve un recurso

// router  get| post | put | delete

module.exports = router;
