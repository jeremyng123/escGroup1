var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user');      // to direct them to login page!

/**
 * the router function has a special function that can allow us to open a sequence of handlers before handling the route
 * this is called middleware
 */

// const noop = function(req,res,next){
//     next();     // when the /tickets path is executed, the next thing that is executed is noop. next() tells the webpage to go to the next handler in the argument
    
// }
// router.get('/tickets',noop,landing.show_tickets);

let {isLoggedIn,hasAuth} = require('../middleware/hasAuth');
let {hasAdminRights} = require('../middleware/hasAccess');
/* GET home page. */
router.get('/', landing.get_landing);
// router.post('/', landing.submit_ticket);

/** Ticket Form for users */
router.get('/ticket/user', isLoggedIn, landing.show_ticket_form);
router.post('/ticket/user', landing.create_ticket);

// ticket routes
router.get('/tickets',isLoggedIn,hasAdminRights);                     // check which page to direct the user (depend on admin rights)
router.get('/tickets/:user_id', hasAuth, landing.show_tickets);       // admin page -- display all queued tickets
router.get('/ticket/:ticket_id/respond', hasAuth, landing.show_respond_ticket);     // respond to ticket
router.post('/ticket/:ticket_id/respond', hasAuth, landing.respond_ticket);
router.get('/my_tickets/:user_id', isLoggedIn,landing.show_my_tickets); // user page
router.get('/my_tickets/ticket/:user_id/:ticket_id',hasAuth, landing.show_one_ticket);  // user making edit to his/her tickets
router.get('/ticket/:ticket_id/edit',hasAuth, landing.show_edit_ticket);
router.post('/ticket/:ticket_id/edit',hasAuth, landing.edit_ticket);      

/********* DELETE ROW FROM tickets TABLE *************/
router.post('/ticket/:ticket_id/delete', hasAuth, landing.delete_ticket);       // using post and different route
router.post('/ticket/:ticket_id/delete-json',hasAuth, landing.delete_ticket_json);  // using ajax

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
 * 4. [e] models.ticket <-- telling it to look at the tickets table
 * 4. [f] models.ticket.create <-- telling the method to CREATE a ROW to tickets TABLE with email: `<name of email>` value
 * 4. [g] models.ticket.findAll() <-- telling the method to SELECT * FROM tickets; --> as it is an ASYNC Task, it will keep returning the next value to landing.pug
 * 4. [h] models.ticket.destroy() <-- telling the method to DESTROY `<id>` FROM tickets;
 *          DELETE FROM "tickets" WHERE "id" = '0cdbc929-1b18-40fe-9937-a06cf2782334'
 * 4. [i] res.redirect('<url page>') --> as the name suggest, redirects page.
 */