// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

// Export a function, so that we can pass 
// the app and io instances from the app.js file:

exports.room = function(req, res){

	// Render views/home.html
	res.render('home');
};

exports.create = function(req,res){

	// Generate unique id for the room
	var id = Math.round((Math.random() * 1000000));

	// Redirect to the random room
	res.redirect('/chat/'+id);
}

exports.chat = function(req,res){

	// Render the chant.html view
	res.render('chat');
}

