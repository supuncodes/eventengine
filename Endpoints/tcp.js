var onCommandCallback = undefined;
var onNewSocketCallback = undefined;
var onDisconnectCallback = undefined;

function start(){

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