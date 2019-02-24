let createError = require('http-errors');

exports.isLoggedIn = function(req,res,next){
    if (req.user){
        next();
    }
    else{
        next('/login');
    }
}

/**
 * if you pass anything to the next() function (except the string 'route'), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions
 */

 exports.hasAuth = function(req,res,next){
    if (req.user && req.user.is_admin == true)
        next();
    else
        next(createError(404, "Page does not exist"))
 }