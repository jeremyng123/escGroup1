let createError = require('http-errors');

exports.isLoggedIn = function(req,res,next){
    if (req.user){
        return next();
    }
    else
        console.log('Currently at:', "some route");
        return next(createError(404, "Page does not exist"));     // need to do something here, so that users go to login/register page first!
}

/**
 * if you pass anything to the next() function (except the string 'route'), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions
 */

 exports.hasAuth = function(req,res,next){
    if (req.user && req.user.is_admin == true)
        return next();
    else
        return next(createError(404, "Page does not exist"))
 }