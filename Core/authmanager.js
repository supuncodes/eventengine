function authenticate(authData, callback){
    
    var appId = authData.appId;
    var authResult = {};

    if (appId){
        var appModule = require("../Authentication/" + appId + ".js");
        
        if (appModule){
            appModule.authenticate (authData.parameters, authModule, function(result){
                authResult.success = result.success; 
                
                if (result.success){
                    authResult.permissions = {
                        allowAll: true,
                        allowedCommands : []
                    };
                }else {
                    authResult.message = result.message;
                }

                callback(authResult);
            });
                
            


        }else {
            authResult.success = false;
            authResult.message = "Invalid App ID";
        }

    }else {
        authResult.success = false;
        authResult.message = "AppID not specified";
    }


    if (!authResult.success)
        callback(authResult);
}

function generateToken(){

}

function refreshToken(){

}

function validateToken(){

}

var authModule =  {
    authenticate: authenticate,
    generateToken: generateToken,
    validateToken : validateToken,
    refreshToken: refreshToken
}

module.exports = authModule;