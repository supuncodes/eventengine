var executor = require("./commandexecutor.js");
var endpointManager = require ("./endpointmanager.js");
var authManager = require ("./authmanager.js");
var clientRegistry = require ("../Registry/localclientregistry.js");
var eventManager = require ("./eventmanager.js");

var resources = {
    executor: executor,
    endpointManager: endpointManager,
    authManager: authManager,
    clientRegistry: clientRegistry
}

endpointManager.onCommand(function(socket, command, data, corelationId){
    if (clientRegistry.isAllowed(socket, command)){

        executor.execute (command, data, socket, resources, function(data){

            var sendData = {success: true, data: data};
            
            if (corelationId)
                sendData.corelationId = corelationId;
            
            socket.send("commandResponse",sendData);
        });
    }
    else
        socket.send ("unauthorized", {success: false, message: "Unauthorized", command: command});
});

endpointManager.onNewSocket(function(socket, authData, parameters){
    
    authManager.authenticate(authData, function(result){
        if (result.success){
            if (socket.type == "twoWay"){
                clientRegistry.add(socket, result.permissions);
                socket.send("authentication", {success: true, message: "Authentication Successfull"});
            }else {
                if (parameters){
                    if (parameters.keepInRegistry)
                        clientRegistry.add(socket, result.permissions, parameters.registryParameters);

                    if (parameters.callback)
                        parameters.callback({success: true}); 
               }
            }

        } else {

            if (socket.type == "twoWay"){
                socket.send("authentication", {success: false, message: "Authentication Failed"});
                socket.disconnect("unauthorized");
            }else {
                if (parameters){
                    if (parameters.callback)
                        parameters.callback({success: false});
                }
            }

        }
    });

}); 

endpointManager.onDisconnect (function(socket, parameters){
    eventManager.unsubscribe(socket);

    if (socket.type == "twoWay"){
        clientRegistry.remove(socket);
    }else {
        if (parameters){
            if (parameters.keepInRegistry)
                clientRegistry.remove(socket);
        }
    }
    
});

function start(){
   endpointManager.start();
}

module.exports = {
    start: start
}