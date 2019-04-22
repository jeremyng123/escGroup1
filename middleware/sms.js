var request = require('request');
var twilio = require('twilio');

var accountSid = '';
var authToken = '';


var client = new twilio(accountSid, authToken);

exports.send_sms = function(req, res, next) {
    client.messages.create({
        body: 'Admin have replied your messages! please login to accenture ticket website and see our response!',
        to: '+6585026210',  
        from: '+19546211020'
    }).then((message) => console.log(message.sid));
    return next();
}