var fs = require('fs');
var exportObject = {};
var filePath = "data.json";
var filePathKardex = "dataKardex.json";
var filePathSecurity = "dataSecurity.json";
exportObject.saveToFile = function(collToSave, handler)
{
    fs.writeFile(filePath, JSON.stringify(collToSave), function(err){
        if(err)
        {
            console.log(err);
            handler(err, null);
        }
        return handler(null, true);
    });
}

exportObject.loadFromFile = function(handler)
{
    fs.readFile(
        filePath, 
        'utf8', 
        function(err, data){
            if(err)
            {
                console.log(err);
                return handler(err, null);
            }

            return handler(null, JSON.parse(data));
        });
}


exportObject.saveToFileKardex = function(collToSave, handler)
{
    fs.writeFile(filePathKardex, JSON.stringify(collToSave), function(err){
        if(err)
        {
            console.log(err);
            handler(err, null);
        }
        return handler(null, true);
    });
}

exportObject.loadFromFileKardex = function(handler)
{
    fs.readFile(
        filePathKardex, 
        'utf8', 
        function(err, data){
            if(err)
            {
                console.log(err);
                return handler(err, null);
            }

            return handler(null, JSON.parse(data));
        });
}

exportObject.saveToFileSecurity = function(collToSave, handler)
{
    fs.writeFile(filePathSecurity, JSON.stringify(collToSave), function(err){
        if(err)
        {
            console.log(err);
            handler(err, null);
        }
        return handler(null, true);
    });
}

exportObject.loadFromFileSecurity= function(handler)
{
    fs.readFile(
        filePathSecurity, 
        'utf8', 
        function(err, data){
            if(err)
            {
                console.log(err);
                return handler(err, null);
            }

            return handler(null, JSON.parse(data));
        });
}
module.exports = exportObject;