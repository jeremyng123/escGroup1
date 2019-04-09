users = [];
connections = [];
var s = require('socket.io');


/************** real time chat **************/
module.exports = function(server) {
    io = s.listen(server);
    io.sockets.on('connection', function(socket){
        connections.push(socket);
        console.log('Connected: %s users have connected', connections.length);

        socket.on('disconnect', function(socket) { // this is different from tut
            connections.splice(connections.indexOf(socket), 1);
            console.log("Disconnected: %s users are connecting", connections.length);
        })

        // send message
        socket.on('send message', function(data) {
            io.sockets.emit('new message', {msg: data});
        });
    });
}

/************* real time chat end *************/