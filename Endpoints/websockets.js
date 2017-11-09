var onCommandCallback = undefined;
var onNewSocketCallback = undefined;
var onDisconnectCallback = undefined;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


function SocketConnection(socket, userName){
    
    var socketObj = {
        disconnect: function(message){
            socket.disconnect(message);
        },
        send: function(command, data){
            socket.emit ("command", {name: command, data:data});
        },
        sessionId: "123",
        userName: userName,
        type: "twoWay"
    };

    socket.on('disconnect', function () {
        console.log('Socket Disconnected');
        if (onDisconnectCallback)
            onDisconnectCallback(socketObj);
    });

    socket.on('command', function (command) {
        console.log('Command recieved');
        if (onCommandCallback)
            onCommandCallback(socketObj, command.name, command.data, command.corelationId);
    });

    return socketObj;
}

io.on('connection', function(socket, clientCallback){
    console.log ("Socket Connected");

    if (onNewSocketCallback){    
        var appId = socket.handshake.query["appid"];
        var parameters = socket.handshake.query["parameters"];
        if (parameters)
            parameters = JSON.parse(parameters);

        var socketObj = new SocketConnection(socket, parameters.username);
        
        onNewSocketCallback(socketObj, {appId: appId, parameters: parameters });
    }
});


app.get('/', function(req, res){
    res.send ("Works!!!");
});


function start(){
    http.listen(3000, function(){
        console.log('listening on *:3000');
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