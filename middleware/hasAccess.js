let createError = require('http-errors');

exports.hasAdminRights = function(req,res,next){
    if (req.user && req.user.is_admin == true){
        return res.redirect('/tickets/' + req.user.userId);
    }
    else if (req.user){
        return res.redirect('/my_tickets/' + req.user.userId);
    }
    else {
        return next(createError(404, "Page does not exist"));     // need to do something here, so that users go to login/register page first!

    }
}
