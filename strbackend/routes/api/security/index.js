var fileModel = require('../filemodel');
var express = require('express');
var router = express.Router();


var secCollection = [];

fileModel.loadFromFileSecurity(
  function(err, savedCollection)
  {
      if(err)
      {
          return;
      }
      secCollection = savedCollection;
      return;
  }
);


router.get('/', function (req, res) {
  res.json({
    "entity": "security",
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
  res.json(secCollection);
}); // get /all


router.post('/new', function(req, res)
{
    var newSecurity = Object.assign({}, req.body);
    var securityExists = secCollection.find(    
            function(o, i){
                return o.sku === newSecurity.sku;
            }
    )
    

    if(!securityExists)
    {
        secCollection.push(newSecurity);
        fileModel.saveToFileSecurity(
            secCollection,
            function(err, saveSuccesfully){
                if(err)
                {
                    res.status(400).json({"error": "No se pudo ingresar objeto"});
                }
                else
                {
                    res.json(newSecurity);   
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

router.put('/update/:secsku',
function(req, res)
{
    var secskuToModify = req.params.secsku;
    console.log(secskuToModify);
    res.json({"msg": "Not implemented yet"});
});
// post /new

// endPoint ==  ejeutar operacion| obtenerRecurso| guardarrecurso 
//              | > devuelve un recurso

// router  get| post | put | delete

module.exports = router;
