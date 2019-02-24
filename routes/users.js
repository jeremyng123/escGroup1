var express = require('express');
var router = express.Router();

let user = require('../controllers/user');
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  
/* Login Page */
router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login',user.login);
router.post('/signup',user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);


module.exports = router;
