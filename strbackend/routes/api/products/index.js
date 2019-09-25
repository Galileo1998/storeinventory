var fileModel = require('../filemodel');
var express = require('express');
var router = express.Router();


var prodCollection = [];

fileModel.loadFromFile(
  function(err, savedCollection)
  {
      if(err)
      {
          return;
      }
      prodCollection = savedCollection;
      return;
  }
);


router.get('/', function (req, res) {
  res.json({
    "entity": "products",
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
  res.json(prodCollection);
}); // get /all


router.post('/new', function(req, res)
{
    var newProduct = Object.assign({}, req.body);
    var productExists = prodCollection.find(    
            function(o, i){
                return o.sku === newProduct.sku;
            }
    )
    

    if(!productExists)
    {
        prodCollection.push(newProduct);
        fileModel.saveToFile(
            prodCollection,
            function(err, saveSuccesfully){
                if(err)
                {
                    res.status(400).json({"error": "No se pudo ingresar objeto"});
                }
                else
                {
                    res.json(newProduct);   
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

router.put('/update/:prdsku',
function(req, res)
{
    var prdskuToModify = req.params.prdsku;
    console.log(prdskuToModify);
    res.json({"msg": "Not implemented yet"});
});
// post /new

// endPoint ==  ejeutar operacion| obtenerRecurso| guardarrecurso 
//              | > devuelve un recurso

// router  get| post | put | delete

module.exports = router;
