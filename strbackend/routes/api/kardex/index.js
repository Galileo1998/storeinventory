var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.json({
        "entity":"kardex",
        "version":"0.0.1"
    });
}); //get

var kardCollection = [];

router.get('/all', function(req, res){
    res.json(kardCollection);
});

router.post('/new', function(req, res){
    var newKard = Object.assign({}, req.body);
    var kardExists = kardCollection.find(
        function(o, i){
            return o.sku === newKard.sku;
        }
    )
    if(!kardExists){
        kardCollection.push(newKard);
        res.json(newKard); // req.body === $_POST[]
    }else{
        res.status(400).json({"error" : "No se pudo ingresar objeto"});
    }
}); // post /new

// endPoint == ejecutar operacion | obtenerRecurso | guardarrecurso |> devuelve un recurso

// router get | post | put | delete

/*
 get    Consultas  select
 post   Crear      insert
 put    Actualizar update
 delete Eliminar   delete 
*/

module.exports = router;