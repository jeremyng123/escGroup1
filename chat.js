/*****************
 * REAL TIME CHAT
 * ****************/
module.exports = function(io) {
    var gravatar = require("gravatar");

    // Initialize a new socket.io application, named 'chat'
    var chat = io.on('connection', function (socket) {

    // When the client emits the 'load' event, reply with the 
    // number of people in this chat room

    socket.on('load',function(user, data){

        var room = findClientsSocket(io,data);
        console.log('emrys: room to be printed', room);

        if(room.length === 0 ) {

        socket.emit('peopleinchat', {number: 0});
        }
        else if(room.length === 1) {

        socket.emit('peopleinchat', {
            number: 1,
            user: user.firstName,
            avatar: room[0].avatar, // change the avatar later
            id: data
            });
        }
        else if(room.length >= 2) {

        chat.emit('tooMany', {boolean: true});
        }
    });

    // When the client emits 'login', save his name and avatar,
    // and add them to the room
    socket.on('login', function(data) {

        var room = findClientsSocket(io, data.id);
        // Only two people per room are allowed
        if (room.length < 2) {

        // Use the socket object to store data. Each client gets
        // their own unique socket object

        socket.username = data.user;
        socket.room = data.id;
        socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});

        // Tell the person what he should use for an avatar
        socket.emit('img', socket.avatar);


        // Add the client to the room
        socket.join(data.id);

        if (room.length == 1) {

            var usernames = [],
            avatars = [];

            usernames.push(room[0].username);
            usernames.push(socket.username);

            avatars.push(room[0].avatar);
            avatars.push(socket.avatar);

            // Send the startChat event to all the people in the
            // room, along with a list of people that are in it.

            chat.in(data.id).emit('startChat', {
                boolean: true,
                id: data.id,
                users: usernames,
                avatars: avatars
            });
        }
        }
        else {
            socket.emit('tooMany', {boolean: true});
        }
    });

    // Somebody left the chat
    socket.on('disconnect', function() {

        // Notify the other person in the chat room
        // that his partner has left
        socket.broadcast.to(this.room).emit('leave', {
        boolean: true,
        room: this.room,
        user: this.username,
        avatar: this.avatar
        });

        // leave the room
        socket.leave(socket.room);
    });


    // Handle the sending of messages
    socket.on('msg', function(data){

        // When the server receives a message, it sends it to the other person in the room.
        socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
    });
    });

    function findClientsSocket(io,roomId) {
        var res = [],
        ns = io.of("/");    // the default namespace is "/"

        if (ns) {
            for (var id in ns.connected) {
                // console.log('emrys: id', id);
                // console.log('emrys: roomId', roomId);
                // console.log('emrys: ns.connected[id].rooms', ns.connected[id].rooms);
                if(roomId) {
                    var keys = Object.keys(ns.connected[id].rooms);
                    var values = keys.map((v)=>{return ns.connected[id].rooms[v];})
                    var index = values.indexOf(roomId) ;
                    
                    res.push(ns.connected[id]);
                    
                }
                else {
                    res.push(ns.connected[id]);
                }
            }
        }
        return res;
    }
}