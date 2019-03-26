let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');       // this allow us to display an error message on the page that is going to be rendered. it is a one-time

const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

/**formData is basically the values keyed in by the user in the form fields */
exports.show_login = function(req, res, next){
    res.render('users/login', { title: "ACNAPI Login", formData: {}, errors: {} });
}
exports.show_signup = function(req, res, next){
    res.render('users/signup', { title: "ACNAPI Register", formData: {}, errors: {} });
}
/** we use const for functions that are local (i.e. other files do not need to use this particular functions) */
const rerender_signup = function(errors, req, res, next){
    res.render('users/signup', { title: "ACNAPI Register", formData: req.body, errors: errors });
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
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
}

exports.logout = function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
}