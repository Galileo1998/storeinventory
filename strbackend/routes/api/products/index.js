var express = require('express');
var router = express.Router();
var fileModel = require('../filemodel');
var kardex = require('../kardex/index');


var prodCollection = [];

fileModel.loadFromFile(
  function(err, savedCollection){
    if(err){
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

router.post('/new', function(req, res){
   var newProduct = Object.assign(
      {},
      req.body,
      {
          "stock": parseInt(req.body.stock),
          "price": parseFloat(req.body.price)
      }
   );
   var productExists = prodCollection.find(
     function(o, i){
       return o.sku === newProduct.sku;
     }
   )
   if( ! productExists ){
     prodCollection.push(newProduct);
     fileModel.saveToFile(
        prodCollection,
        function(err, savedSuccesfully){
          if(err)
          {
            res.status(400).json({ "error": "No se pudo ingresar objeto" });
          } else
          {
            res.json(newProduct);  // req.body ===  $_POST[]  
            kardex.enviar(req, res);  
          }
        }
      );
   } else {
     res.status(400).json({"error":"No se pudo ingresar objeto"});
   }
}); // post /new

router.put('/update/:prdsku',
  function(req, res){
      var prdskuToModify = req.params.prdsku;
      var amountToAdjust = parseInt(req.body.ajustar);
      var adjustType = req.body.tipo || 'SUB';
      var adjustHow = (adjustType == 'ADD' ? 1 : -1);
      var modProduct = {};
      var newProductArray = prodCollection.map(
        function(o,i){
          if( prdskuToModify === o.sku){
             o.stock += ( amountToAdjust * adjustHow );
             modProduct = Object.assign({}, o);
          }
          return o;
        }
      ); // end map
    prodCollection = newProductArray;
    fileModel.saveToFile(
      prodCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo actualizar objeto" });
        } else {
          res.json(modProduct);  // req.body ===  $_POST[]
        }
      }
    );
  }
);// put :prdsku

// endPoint ==  ejeutar operacion| obtenerRecurso| guardarrecurso 
//              | > devuelve un recurso

// router  get| post | put | delete

router.delete(
  '/delete/:prdsku',
  function( req, res) {
    var prdSkuToDelete  = req.params.prdsku;
    var newProdCollection = prodCollection.filter(
      function(o, i){
        return prdSkuToDelete !== o.sku;
      }
    ); //filter
    prodCollection = newProdCollection;
    fileModel.saveToFile(
      prodCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo eliminar objeto" });
        } else {
          res.json({"newProdsQty": prodCollection.length});
        }
      }
    );
  }
);// delete

module.exports = router;
