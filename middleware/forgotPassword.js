var request = require('request');
module.exports = function(req, res, next, newPW) {
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
       html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Accenture</title> <meta name="viewport" content="width=device-width, initial-scale=1.0"/></head> <body style="margin: 0; padding:0;"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;"> <tr> <td align="center" bgcolor=" #F0F0F0 " style="padding: 0px 0 0px 0;"> <img src="/images/Accenture-logo.png" alt="Sorry image cannot be displayed." width="300" height="150" style="display:block;"/> </td></tr><tr> <td bgcolor="#ffffff" style="padding: 45px 30px 0px 30px"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 18px; "> <b>Dear User,</b> </td></tr><tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 14px; padding: 10px 0 20px 0"> <b> Thank you for using Accenture's ACNAPI. You have clicked on 'Forget your password' and hence we have generated a new password for you. </b> </td></tr><table align="center" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #E0E4E8;" width="100%"><tbody><tr><td align="left" style="padding: 20px;" valign="top"><a style='font-family: "lato", "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 28px;font-size: 18px; text-align:center; font-weight: bold;'>${newPW}</a></td></tr></tbody></table> </table> </td></tr><tr> <td bgcolor="#ffffff" style="padding: 70px 30px 40px 30px"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 18px; padding: 10px 0 20px 0"> <b><u> Be sure to check out our latest newsletter articles!</u></b> </td></tr><tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td width="260" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 18px; "bgcolor="#70bbd9"> <img src="/images/email/TechVision2019.jpg" alt="" width="100%" height="140" style="display: block;"/> </td></tr><tr> <td bgcolor="#F0F0F0" style="padding: 10px 0 0 0;"> <b><font size=5px><u>Accenture Technology Vision 2019 </u> <br><br></font> </b> <b>The post-digital era is upon us. We outline five technology trends that will characterize the post-digital future. <br></b> <a href="https://www.accenture.com/sg-en/insights/technology/technology-trends-2019" style="color: #000000;"><font color="#4C84E9" size=3px> <b> Read More</b> </font></a> </td></tr></table> </td><td style="font-size: 0; line-height: 0; width: 20"> &nbsp; </td><td width="260" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="ee4c50"> <img src="/images/email/wayBeyondMarketing.png" alt="" width="100%" height="140" style="display: block;"/> </td><tr> <td bgcolor=" #F0F0F0 " style="padding: 10px 0 65px 0;"> <b><font size=5px><u>Way Beyond Marketing</u> <br><br></font> </b> <b>Learn more about the rise of the hyper-relevant CMO. <br></b> <a href="https://www.accenture.com/sg-en/insights/consulting/cmo" style="color: #000000;"><font color="#4C84E9" size=3px> <b> Read More</b> </font></a> </td></tr></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor="#F0F0F0 " style="padding: 10px 30px 10px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td width="75%"" align="left" style="color: #000000; font-family: Arial, sans-serif; font-size: 14px;"> Accenture 2019 &reg; All rights reserved.<br/> <a href="#" style="color: #000000;"><font color="#4C84E9"> Unsubscribe</font></a> to our newsletter instantly </td><td align="right"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td> <a href="https://www.facebook.com/accenture/"> <img src="/images/email/social-facebook.svg" alt="Facebook" width="38" height="38" style="display: block;" border="0"/> </a> </td><td> <a href="https://twitter.com/Accenture?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"> <img src="/images/email/social-twitter.svg" alt="Twitter" width="38" height="38" style="display: block;" border="0"/> </a> </td><td> <a href="https://www.instagram.com/accenture/?hl=en"> <img src="/images/email/instagram.png" alt="Instagram" width="45" height="45" style="display: block;" border="0"/> </a> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>` }, // test
    json: true };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
  
      console.log(body);
    });
    return 0;
}