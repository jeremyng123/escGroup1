var request = require('request');

exports.specific_admin_rtchat = function(req, res, next) {
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
       recipient: 'jeremy_ng@mymail.sutd.edu.sg', // req.user.email -- we can use this to send to clients' email too! :)
       html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Accenture</title> <meta name="viewport" content="width=device-width, initial-scale=1.0"/></head> <body style="margin: 0; padding:0;"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;"> <tr> <td align="center" bgcolor=" #F0F0F0 " style="padding: 0px 0 0px 0;"> <img src="http://escgroup1.herokuapp.com/Accenture-logo.png" alt="Sorry image cannot be displayed." width="300" height="150" style="display:block;"/> </td></tr><tr> <td bgcolor="#ffffff" style="padding: 10px 30px 40px 30px ;font-family: Arial, sans-serif;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" paddint-bottom="10px"> <img src="http://escgroup1.herokuapp.com/portrait.png" alt="Sorry image cannot be displayed." width="150" height="100" style="display:block;"/> <font size=3px><a href="http://www.linkedin.com/in/chin-tak-ong-6b2a75145" style="color: #000000;"><font color="#4C84E9"></font><b>Ong Chin Tak <br>Vice President, Tech Consulting</b></font> </td></tr><tr> <td style="padding:20px 0 0 0;color: #153643; font-family: Arial, sans-serif;font-size: 18px; "> <b>Dear Admin,</b> </td></tr><tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 14px; padding: 10px 0 20px 0"> <b> There is a user inviting you to have a real time chat to solve the problem. Please login <a href="http://escgroup1.herokuapp.com/chat/admin/”+${req.params.admin_id}style="color: #000000;"><font color="#4C84E9"> here </font></a> to join the real time chat! </b> </td></tr></table> </td></tr><tr> <td bgcolor="#F0F0F0 " style="padding: 10px 30px 10px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td width="75%"" align="left" style="color: #000000; font-family: Arial, sans-serif; font-size: 14px;"> Accenture 2019 &reg; All rights reserved.<br/> <a href="http://escgroup1.herokuapp.com/" style="color: #000000;"><font color="#4C84E9"> Unsubscribe</font></a> from our newsletter instantly </td><td align="right"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td> <a href="https://www.facebook.com/accenture/"> <img src="http://escgroup1.herokuapp.com/social-facebook.svg" alt="Facebook" width="38" height="38" style="display: block;" border="0"/> </a> </td><td> <a href="https://twitter.com/Accenture?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"> <img src="http://escgroup1.herokuapp.com/social-twitter.svg" alt="Twitter" width="38" height="38" style="display: block;" border="0"/> </a> </td><td> <a href="https://www.instagram.com/accenture/?hl=en"> <img src="http://escgroup1.herokuapp.com/instagram.png" alt="Instagram" width="45" height="45" style="display: block;" border="0"/> </a> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>` }, // test
    json: true };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
    });
    return next();
  }