var onCommandCallback = undefined;
var onNewSocketCallback = undefined;
var onDisconnectCallback = undefined;

var endpoints = [];

function start(){

    var process = require ("process");
    var fs = require ("fs");
    var path = require ("path");
    var endpointLoc = path.resolve(process.cwd(), "Endpoints");

    fs.readdir(endpointLoc, function(err,files){
        files.forEach(function(file) {
            if (file.endsWith(".js")){
                try{
                    var moduleObj = require ("../Endpoints/" + file);
                    moduleObj.onCommand(onCommandCallback);
                    moduleObj.onNewSocket(onNewSocketCallback);
                    moduleObj.onDisconnect(onDisconnectCallback);
                    moduleObj.start();   
                    endpoints.push(moduleObj);
                }
                catch (e){
                    console.log ("Error loading module");
                }
            }
        });
    });

}

function server(){
    
}

function stop(){

}

module.exports = {
    start: start,
    stop: stop,
    onCommand: function(callback){
        onCommandCallback = callback;
    },
    onNewSocket: function(callback){
        onNewSocketCallback = callback;
    },
    onDisconnect: function(callback){
        onDisconnectCallback = callback;
    }
}