var express = require('express');
var router = express.Router();

let index = require('../controllers/index')
/* GET users listing. */
router.get('/', index.index);

module.exports = router;
