var request = require('request');
var twilio = require('twilio');

var accountSid = 'AC196ea7919134f5893afad1cb5a86defb';
var authToken = 'e8082c73e7a6e018ff79b71415878acd';


var client = new twilio(accountSid, authToken);

exports.send_sms = function(req, res, next) {
    client.messages.create({
        body: 'Hello from Node',
        to: '+6585026210',  
        from: '+19546211020'
    }).then((message) => console.log(message.sid));
    return next();
}