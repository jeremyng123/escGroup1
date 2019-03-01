var request = require('request');

exports.send_email = function(req, res, next) {
    var options = { method: 'POST',
    url: 'https://ug-api.acnapiv3.io/swivel/email-services/api/mailer',
    headers: 
     { 'Postman-Token': 'cc8219ed-a243-4a8f-bb39-0e31b12a8744',
       'cache-control': 'no-cache',
       Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJVcnJiZDJvdjlYNUtHUzFaV0hYMktRNG9mOUNRWElVcEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI1NTAsImV4cCI6MTU1MjU0NDU1MCwiYXpwIjoiVXJyYmQyb3Y5WDVLR1MxWldIWDJLUTRvZjlDUVhJVXAiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.0d9cH-Fu72hkVMCUNeRHIsnRG-2T-qnTMyAtOSLm45n1v6RzLmRFG1sSyZ92g3WFq3R59TG4KQAFt7zJ4dUGCdp9Zhu4AOSgbenlfOLdOWHZwyV-0odYySa0JE4Q-yxqL5xRDuATvPRgamOopcYwKduXql9zebu5VfALr9d2j1YSTxD8k0qDA7np5gqBxmEx1NyCM6u-0uaeIIqq4SKdg095EcyVTUflv9FTKpKSLT07B11zQ0opIb3rZQRxi1swpbJFtas8WTHYMagJpWkwTdC1iV4IDIIBlOjg3aRcNOu4GLSpm9lbGk86VOJ7ZBbNAP-BAA0ynhamLkPrj1vDTg',
       'Content-Type': 'application/json',
       'Server-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJVcnJiZDJvdjlYNUtHUzFaV0hYMktRNG9mOUNRWElVcEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI1NTAsImV4cCI6MTU1MjU0NDU1MCwiYXpwIjoiVXJyYmQyb3Y5WDVLR1MxWldIWDJLUTRvZjlDUVhJVXAiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.0d9cH-Fu72hkVMCUNeRHIsnRG-2T-qnTMyAtOSLm45n1v6RzLmRFG1sSyZ92g3WFq3R59TG4KQAFt7zJ4dUGCdp9Zhu4AOSgbenlfOLdOWHZwyV-0odYySa0JE4Q-yxqL5xRDuATvPRgamOopcYwKduXql9zebu5VfALr9d2j1YSTxD8k0qDA7np5gqBxmEx1NyCM6u-0uaeIIqq4SKdg095EcyVTUflv9FTKpKSLT07B11zQ0opIb3rZQRxi1swpbJFtas8WTHYMagJpWkwTdC1iV4IDIIBlOjg3aRcNOu4GLSpm9lbGk86VOJ7ZBbNAP-BAA0ynhamLkPrj1vDTg' },
    body: 
     { subject: 'test subject using ACNAPI',
       sender: 'admin@accenture.com',
       recipient: 'newbie126@gmail.com', // req.user.email -- we can use this to send to clients' email too! :)
       html: '<h1>Hello</h1>' }, // test
    json: true };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
    });
    return next();
  }