var clients = {}

function add(socket){
    if (!clients[socket.userName])
        clients[socket.userName] = {};
    
    clients[socket.userName][socket.sessionId] = socket;
}

function remove(socket){
    if (clients[socket.userName])
    if (clients[socket.userName][socket.sessionId])
        delete clients[socket.userName][socket.sessionId]
}

function getAll(){
    return clients;
}

function get(func){

}

function isAllowed(){
    return true;
}

module.exports = {
    add: add,
    remove: remove,
    getAll: getAll,
    get: get,
    isAllowed: isAllowed
}