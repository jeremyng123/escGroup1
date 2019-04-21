let createError = require('http-errors');

exports.isLoggedIn = function(req,res,next){
    if (req.user){
        console.log("isLoggedin\n");
        return next();
    }
    else
        return res.redirect('/users/signup');  // need to do something here, so that users go to login/register page first!
}

exports.isVerified = function(req,res,next){
    if (req.user.is_verified){
        console.log("isVerified\n");
        return next();
    }
    else
        return res.redirect('/users/not_verified');  
}

 exports.hasAuth = function(req,res,next){
    if (req.user.is_admin == true){
        console.log("hasAuth\n");
        return next();
    }
    else
        return next(createError(404, "Page does not exist"))
 }

 /**
  * Use this methodology when needing to make decision where to direct user
  */
 exports.whatRights = function(req,res,next){
    if (req.user && req.user.is_admin){
        const PATH = '/ticket/' + '0/' + req.user.userId;
        return res.redirect(PATH);  // tickets page that are queued
    }
    else if (req.user){
        return res.redirect('/my_ticket/' + '0/' + req.user.userId );
    }
    else {
        return res.redirect('/users/signup');
    }
}
