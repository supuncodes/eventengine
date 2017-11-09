
var connector = new EngineConnector("http://localhost:3000");

var authData = {username: "test", password: "test"};
connector.connect ("token", authData, function(result){
    if (result.success){
        alert(result.message);
        addEventListeners();
    }else {
        alert(result.message);
    }
});

function addEventListeners(){
    connector.onCommand(handleCommand);
}

function handleCommand(command, data){
    switch (command){
        case "pro-location-changed":
            //update the markers
            break;
        case "pro-offline":
            break;
        case "pro-online":
            break;

    }
}

function invokeTestCommand(){
    connector.serverCommand("testcommand",{id:1, name:"supuns"}, function(data){
        alert ("Message recieved from server : " + data);
    });
}
