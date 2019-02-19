var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);

// create a new route
router.get('/leads',landing.show_leads);
router.get('/lead/:lead_id/', landing.show_lead);    // using : defines it as a parameter. whatever route assigned to :lead_id from landing.pug will be stored in lead_id
/* get shows the form to edit, post submits the form to edit the lead_id */
/* Notice that the get and post are from the same URL its so that the handler can 
handle both requests */
router.get('/lead/:lead_id/edit', landing.show_edit_lead);    // using : defines it as a parameter, defined by landing.show_edit_lead
router.post('/lead/:lead_id/edit', landing.edit_lead);      

module.exports = router;
