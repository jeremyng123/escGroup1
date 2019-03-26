var request = require('request');

exports.send_email = function(req, res, next) {
    var options = { method: 'POST',
    url: process.env.SEND_EMAIL_URL,
    headers: 
     { 'Postman-Token': process.env.POSTMAN_TOKEN,
       'cache-control': 'no-cache',
       Authorization: 'Bearer ' + process.env.SERVER_TOKEN,
       'Content-Type': 'application/json',
       'Server-Token': process.env.SERVER_TOKEN },
    body: 
     { subject: 'test subject using ACNAPI',
       sender: 'admin@accenture.com',
       recipient: req.user.email, // req.user.email -- we can use this to send to clients' email too! :)
       html: '<h1>Hello please verify your account here!</h1>' }, // test
    json: true };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
    });
    return next();
  }