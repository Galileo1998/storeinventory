var express = require('express');
var router= express.Router();

router.get('/', function(req, res){
    res.json({
        "entity":"security",
        "version": "0.0.1"
    });
}); //get

var secCollection = [];

router.get('/all', function(req, res){
    res.json(secCollection);
});

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
        res.json(newSecurity);
    }
    else
    {
        res.status(400).json({"error": "No se pudo ingresar objeto"});
    }

    //prodCollection.push(newProduct);
    //res.json(newProduct);
});

module.exports= router;