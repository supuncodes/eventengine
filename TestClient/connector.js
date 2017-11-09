function EngineConnector(url){
    var cbCommand, cbDisconnect, cbConnect;
    var cbEvent = {};
    var socket;
    var cid =0;
    var callbackMapping = {};

    function connect(appId, parameters, connectCallback){

        socket = io(url, { query: "appid=" + appId + "&parameters=" + JSON.stringify(parameters) });

        socket.on('command', function(command){
            if (command.name == "authentication"){
                if (connectCallback)
                   connectCallback(command.data);
            }else {
                if (command.data.corelationId){
                    var cb = callbackMapping[command.data.corelationId];
                    if (cb)
                        cb (command.data.data)
                    else {
                        if (cbCommand)
                            cbCommand(command.name, command.data.data); 
                    }
                }else{
                    if (cbCommand)
                        cbCommand(command.name, command.data.data);
                }


            }
        });

        socket.on('disconnect', function(data){
            if (cbDisconnect)
                cbDisconnect(data); 
        });
    }


    return {
        onConnect: function(callback){
            cbConnect = callback;
        },
        onDisconnect: function(callback){
            cbDisconnect = callback;
        },
        connect: connect,
        onCommand: function(callback){
            cbCommand = callback;
        },
        serverCommand: function(name, data, callback){
            
            var sendData = {name: name, data:data};
            if (callback){
                cid++;
                callbackMapping[cid] = callback;
                sendData.corelationId = cid;
            }
            socket.emit("command", sendData);
            
        },
        subscribe: function(event, func){
            cbEvent[event] = func;
        },
        trigger: function(event,data){
            
        }
    }
}