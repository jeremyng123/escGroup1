var express = require('express');
var router = express.Router();

<<<<<<< HEAD
// let user = require('../controllers/user');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

=======
let user = require('../controllers/user');
/* Login Page */
router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login',user.login);
router.post('/signup',user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);
>>>>>>> 0ab21d0070f26f50789414261215cb10f081e0fe


module.exports = router;
