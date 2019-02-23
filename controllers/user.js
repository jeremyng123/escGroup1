let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');       // this allow us to display an error message on the page that is going to be rendered. it is a one-time


exports.show_login = function(req, res, next){
    res.render('users/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next){
    res.render('users/signup', { formData: {}, errors: {} });
}

// exports.signup = function(req, res, next) {
//     console.log('email:', req.body.email);
//     console.log('password', req.body.password);
//     return models.user.create({
//         email: req.body.email,
//         password: req.body.password
//     }).then(lead=> {    // lead is a variable sent to the /leads/
//         res.redirect('/login')  // redirect to a new webpage when we submit email
//     });
// };

const generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null)
}
exports.signup = function(req, res, next) {
    const newUser = models.User.build({
        email: req.body.email,
        password: generateHash(req.body.password)
    });
    return newUser.save().then(result => {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/signup",
            failureFlash: true
        })(req, res, next);
    })
}

exports.login = function(req,res,next){
    
}