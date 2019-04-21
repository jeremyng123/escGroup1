let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');       // this allow us to display an error message on the page that is going to be rendered. it is a one-time

const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

// var os = require("os");
// var hostname = os.hostname();

/* Verify User accounts */
exports.show_verify = function(req,res,next) {
	res.render('users/verify', { title: "ACNAPI Login" , user: req.user })
}

exports.verify = function(req,res,next) {
	return models.user.update({
		is_verified	: true
	}, { where : {
		userId : req.params.user_id
		}
	}).then(() => {
		res.redirect("/");
	})
}

exports.show_change_email = function(req,res,next) {
	res.render('users/change_email', { title: "ACNAPI Login" , user: req.user })
}

exports.change_email = function(req, res, next) {
	return models.user.update({
		email : req.body.email,
	}, { where: {
		userId: req.user.userId
		}
	}).then(update => {
		res.redirect("/");    // redirect homepage
	}).catch(err => console.log("error again!" + err));
};

/* Forgot Password */
exports.show_forgot_password = function(req, res, next) {
	if (req.user != null) res.redirect("/");
	else
		res.render('users/forgot_password', { title: "ACNAPI Login" , user: req.user })
};

/**
 * randomized string and return random combination
 * @param {*} length 
 */
function makeid(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()][';/.,|}{:?><`~";
  
	for (var i = 0; i < length; i++)
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
  
	return text;
  }
  

exports.forgot_password = function(req, res, next) {
	
	return models.user.findOne({
		where: { 
			email			: req.body.email, 
			phoneNumber		: req.body.phoneNumber
		}
	}).then(user => {
		if (user != null) {
			var newPW = makeid(12);		// make a new password with 12 characters
			var forgotPassword = require('../middleware/forgotPassword')(req,res,next,newPW);
			console.log(newPW);
			return models.user.update({
				password	: generateHash(newPW)
			}, { 
				where : {
					email		: user.email,
					phoneNumber	: user.phoneNumber
				}
			}).then(async function(){
				console.log(newPW);
				await forgotPassword
				return res.redirect("/");
				
				
			})
		}
		else return res.redirect("/");
	})
};
let validator = require('validator');

const rerender_change_password = function(errors, req, res, next){
	return res.render('users/change_password', { title: "ACNAPI Change Password", formData: req.body, errors: errors });
}

exports.show_change_password = function(req, res, next) {
	return res.render('users/change_password', { title: "ACNAPI Change Password", formData: {} , errors: {} , user: req.user })
  };

const validatePassword = function (errors, req){
	if (!validator.isAscii(req.body.newPW)){
		errors["password"] = "Invalid characters in password, try another one!";
	}
	if (!validator.isLength(req.body.newPW, {min: 8})){
		errors["password"] = "Ensure that your password has a minimum of 8 characters";
	}
	if (!validator.equals(req.body.newPW,req.body.newPW2)){                   // have not included in test cases
		errors["password2"] = "Those passwords didn't match. Try again."
	}
}
  
exports.change_password = async function(req, res, next) {
	let errors = {};
	await validatePassword(errors, req)
	if (!isEmpty(errors)) {
		return rerender_change_password(errors,req,res,next);
	}
	else {
		return models.user.update({
			password   : generateHash(req.body.newPW)
		}, { 
			where: { 
				userId: req.user.userId 
			}
		}).then(update => {
			res.redirect("/users/inform_password_change");    // redirect homepage
		}).catch(err => console.log("error again!" + err));
	}
}

/**
 * sends an email to user to verify with user that password has been changed
 */
var request = require('request');
exports.inform_password_change = async function(req, res, next) {
    var options = { method: 'POST',
    url: process.env.SEND_EMAIL_URL,
    headers: 
     { 'Postman-Token': process.env.POSTMAN_TOKEN,
       'cache-control': 'no-cache',
       Authorization: 'Bearer ' + process.env.SERVER_TOKEN,
       'Content-Type': 'application/json',
       'Server-Token': process.env.SERVER_TOKEN },
    body: 
     { subject: 'ACNAPI Password Changed',
       sender: 'admin@accenture.com',
       recipient: req.user.email,
       html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Accenture</title> <meta name="viewport" content="width=device-width, initial-scale=1.0"/></head> <body style="margin: 0; padding:0;"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;"> <tr> <td align="center" bgcolor=" #F0F0F0 " style="padding: 0px 0 0px 0;"> <img src="http://escgroup-1.herokuapp.com/images/Accenture-logo.png" alt="Sorry image cannot be displayed." width="300" height="150" style="display:block;"/> </td></tr><tr> <td bgcolor="#ffffff" style="padding: 45px 30px 0px 30px"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 18px; "> <b>Dear ${req.user.firstName},</b> </td></tr><tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 14px; padding: 10px 0 20px 0"> <b> Your password has been changed. If you did not make this change, please click <a href="http://escgroup-1.herokuapp.com/users/" + req.user.userId + "/pw" style="color: #000000;"><font color="#4C84E9"> here </font></a></b> </td></tr></table> </td></tr><tr> <td bgcolor="#ffffff" style="padding: 70px 30px 40px 30px"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 18px; padding: 10px 0 20px 0"> <b><u> Be sure to check out our latest newsletter articles!</u></b> </td></tr><tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td width="260" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="color: #153643; font-family: Arial, sans-serif;font-size: 18px; "bgcolor="#70bbd9"> <img src="http://escgroup-1.herokuapp.com/images/email/TechVision2019.jpg" alt="" width="100%" height="140" style="display: block;"/> </td></tr><tr> <td bgcolor="#F0F0F0" style="padding: 10px 0 0 0;"> <b><font size=5px><u>Accenture Technology Vision 2019 </u> <br><br></font> </b> <b>The post-digital era is upon us. We outline five technology trends that will characterize the post-digital future. <br></b> <a href="https://www.accenture.com/sg-en/insights/technology/technology-trends-2019" style="color: #000000;"><font color="#4C84E9" size=3px> <b> Read More</b> </font></a> </td></tr></table> </td><td style="font-size: 0; line-height: 0; width: 20"> &nbsp; </td><td width="260" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="ee4c50"> <img src="http://escgroup-1.herokuapp.com/images/email/wayBeyondMarketing.png" alt="" width="100%" height="140" style="display: block;"/> </td><tr> <td bgcolor=" #F0F0F0 " style="padding: 10px 0 65px 0;"> <b><font size=5px><u>Way Beyond Marketing</u> <br><br></font> </b> <b>Learn more about the rise of the hyper-relevant CMO. <br></b> <a href="https://www.accenture.com/sg-en/insights/consulting/cmo" style="color: #000000;"><font color="#4C84E9" size=3px> <b> Read More</b> </font></a> </td></tr></tr></table> </td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor="#F0F0F0 " style="padding: 10px 30px 10px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td width="75%"" align="left" style="color: #000000; font-family: Arial, sans-serif; font-size: 14px;"> Accenture 2019 &reg; All rights reserved.<br/> <a href="#" style="color: #000000;"><font color="#4C84E9"> Unsubscribe</font></a> to our newsletter instantly </td><td align="right"> <table border="0" cellpadding="0" cellspacing="0"> <tr> <td> <a href="https://www.facebook.com/accenture/"> <img src="http://escgroup-1.herokuapp.com/images/email/social-facebook.svg" alt="Facebook" width="38" height="38" style="display: block;" border="0"/> </a> </td><td> <a href="https://twitter.com/Accenture?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"> <img src="http://escgroup-1.herokuapp.com/images/email/social-twitter.svg" alt="Twitter" width="38" height="38" style="display: block;" border="0"/> </a> </td><td> <a href="https://www.instagram.com/accenture/?hl=en"> <img src="http://escgroup-1.herokuapp.com/images/email/instagram.png" alt="Instagram" width="45" height="45" style="display: block;" border="0"/> </a> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>` }, // test
    json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
    return res.redirect("/");
}

const rerender_wrong_pw_change = function(errors, req, res, next){
	return res.render('users/wrong_pw_change', { title: "ACNAPI Change Password", formData: req.body, errors: errors });
}

exports.show_wrong_pw_change = async function(req, res, next) {
	res.render('users/wrong_pw_change', { title: "ACNAPI Change Password", formData: {} , errors: {} })
}

exports.wrong_pw_change = async function(req, res, next) {
	let errors = {};
	await validatePassword(errors, req)
	if (!isEmpty(errors)) {
		return rerender_wrong_pw_change(errors,req,res,next);
	}
	else {
		return models.user.findOne({
			where: {
				userId			:	req.params.user_id,
				phoneNumber	:	req.body.phoneNumber
			}
		}).then(user => {
			if (user === null) res.redirect("/users/inform_password_change");    // redirect homepage
			else {
				return models.user.update({
					password   : generateHash(req.body.newPW)
				}, { 
					where: { 
						userId: req.params.user_id
					}
				}).then(update => {
					res.redirect("/users/inform_password_change");    // redirect homepage
				}).catch(err => console.log("error again!" + err));
			}
		})
	}
}

	

/* Login + Signup user credentials */
/**formData is basically the values keyed in by the user in the form fields */
exports.show_login = function(req, res, next){
	res.render('users/login', { title: "ACNAPI Login" , formData: {} });
}
exports.show_signup = function(req, res, next){
	res.render('users/signup', { title: "ACNAPI Register", formData: {}, errors: {} });
}
/** we use const for functions that are local (i.e. other files do not need to use this particular functions) */
const rerender_signup = function(errors, req, res, next){
	return res.render('users/signup', { title: "ACNAPI Register", formData: req.body, errors: errors });
}

const rerender_login = function(errors, req, res, next){
	return res.render('users/login', { title: "ACNAPI Register", formData: req.body, errors: errors });
}

const generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null)
}

exports.signup = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)){      // if the error field is not empty,then it will re-render the signup page to show errors in field
			rerender_signup(errors, req, res, next)
		}
		else {
			return models.user.findOne({
				where: {
					is_admin: true
				}
			}).then(user => {
				let newUser;
				if (user != null) {
					newUser = models.user.build({
						email: req.body.email,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						phoneNumber: req.body.phoneNumber,
						password: generateHash(req.body.password)
					});
				}else {
					newUser = models.user.build({
						email: req.body.email,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						password: generateHash(req.body.password),
						is_admin: true,
						phoneNumber: req.body.phoneNumber,
					});
				}return newUser.save().then(result => {
					passport.authenticate('local', {
						successRedirect: "/",
						failureRedirect: "/users/signup",
						failureFlash: true
					})(req, res, next);
				})
			})
		}
	})
}

exports.login = function(req,res,next){
	let errors = {};
	return models.user.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (user == null) {
			errors["credentials"] = "Wrong credentials entered.\nClick on 'Forget Password' if you cannot remember your credentials"
			rerender_login(errors, req, res, next);
		}
		else {
			passport.authenticate('local', {
				successRedirect: "/",
				failureRedirect: "/users/login",
				failureFlash: true
			})(req, res, next);
		}
	});
}

exports.logout = function(req,res,next){
	req.logout();
	req.session.destroy();
	res.redirect('/');
}