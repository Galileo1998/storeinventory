var express = require('express');
var router= express.Router();

router.get('/', function(req, res){
    res.json({
        "entity":"products",
        "version": "0.0.1"
    });
}); 
//get
var prodCollection = [];

router.get('/all', function(req, res){
    res.json(prodCollection);
});

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
        res.json(newProduct);
    }
    else
    {
        res.status(400).json({"error": "No se pudo ingresar objeto"});
    }

    //prodCollection.push(newProduct);
    //res.json(newProduct);
});

// endPoint == ejecutar una operacion | obtener un recurso |>devuelve un recurso
//              |>Devuelve un recurso
// router    get   |   post    |   put   |   delete
module.exports= router;