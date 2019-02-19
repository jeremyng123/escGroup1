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

/* Notice that the get and post are from the same URL its so that the handler can handle both requests */
/********* ADD ROW TO leads TABLE *************/
router.get('/lead/:lead_id/edit', landing.show_edit_lead);    // using : defines it as a parameter, defined by landing.show_edit_lead
router.post('/lead/:lead_id/edit', landing.edit_lead);      

/********* DELETE ROW FROM leads TABLE *************/
router.post('/lead/:lead_id/delete', landing.delete_lead);
// different ways to do delete. NOTICE THAT WE DID NOT router.get()! This is unncessary if we are using JSON --> jQuery w/ AJAX because these are done in background
router.post('/lead/:lead_id/delete-json', landing.delete_lead_json);

module.exports = router;



/**************** THE FLOW OF HOW THINGS WORK *******************/
/**
 * 1. app.js starts up the webapp backend
 * 2. Loads the '/' framework through var indexRouter = requires('routes/landing.js')
 * 3. (a) landing.js looks at current URL and router.get('<URL branches>', function), whereby function is being sorted out in controllers/landing.js
 * 3. (b) the landing.(method) is accomplished by `let landing = require('../controllers/landing')` which allows us to call the methods found in that file
 * 3. (c) this allows us to know at which `branch` will certain method perform certain action
 * 
 * 4. [a]some of the methods in landing.js will render the page according to the pug files found in views folder through res.render('`filename in views folder`', { 'key' : value } )
 * 4. [b] the 2nd argument in res.render('`filename in views folder`', { 'key' : value } ) because it allows the pug file to obtain a value from 'key' and display it on the webpage
 * 4. [c] we also use function(res, req, next) {} to perform ASYNC task.
 * 4. [d] models is a class obtain through var models = require('../models')
 * 4. [e] models.lead <-- telling it to look at the leads table
 * 4. [f] models.lead.create <-- telling the method to CREATE a ROW to leads TABLE with email: `<name of email>` value
 * 4. [g] models.lead.findAll() <-- telling the method to SELECT * FROM leads; --> as it is an ASYNC Task, it will keep returning the next value to landing.pug
 * 4. [h] models.lead.destroy() <-- telling the method to DESTROY `<id>` FROM leads;
 *          DELETE FROM "leads" WHERE "id" = '0cdbc929-1b18-40fe-9937-a06cf2782334'
 * 4. [i] res.redirect('<url page>') --> as the name suggest, redirects page.
 */