var onCommandCallback = undefined;
var onNewSocketCallback = undefined;
var onDisconnectCallback = undefined;

var app = require('express')();
var http = require('http').Server(app);

app.post('/:command', function(req, res){
    var tmp = req.body;
    handleCommand(undefined, req.command, {}, res);
});

app.post('/:module/:command', function(req, res){
    handleCommand(req.module, req.command, {}, res);
});


function handleCommand (module, command, data, res){

    var socketObj = {
        disconnect: function(message){
            
        },
        send: function(command, data){
            res.send (data);
        },
        sessionId: "123",
        userName: "",
        type: "oneWay"
    };

    if (onNewSocketCallback){
        var parameters = {
            callback: function(){
                if (onCommandCallback)
                    onCommandCallback(socketObj, command, data);
            }
        }

        onNewSocketCallback(socketObj, {appId: "", parameters: {}}, parameters);
    }
}

function start(){
    http.listen(3001, function(){
        console.log('listening on *:3001');
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