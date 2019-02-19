var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);

// create a new route
router.get('/leads',landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);    // using : defines it as a parameter, defined by landing.show_lead

module.exports = router;
