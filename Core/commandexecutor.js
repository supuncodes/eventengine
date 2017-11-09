function execute(command, data, socket, resources, callback){
    var module = require("../Modules/" + command + ".js");
    module.execute(data, socket, resources, callback);
}

exports.execute = execute;