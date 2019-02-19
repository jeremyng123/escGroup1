var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);

// create a new route
router.get('/leads',landing.show_leads);

module.exports = router;
