var express = require('express');
var router = express.Router();

/*************** CONTROLLER *****************/
let general = require('../controllers/general');
let admins = require('../controllers/admins');
let user = require('../controllers/user');      // to direct them to login page!

/*************** MIDDLEWARE *****************/
let {isLoggedIn,hasAuth} = require('../middleware/hasAuth');
let {hasAdminRights} = require('../middleware/hasAccess');
let {send_email} = require('../middleware/email');


/*************** HOMEPAGE *****************/
router.get('/', general.get_welcome);

/*************** GENERAL TICKET ROUTES *****************/
router.get('/ticket/form', isLoggedIn, general.show_ticket_form);       // create ticket form
router.post('/ticket/form', send_email, general.create_ticket);
router.get('/my_tickets/:user_id/0', isLoggedIn, general.show_my_tickets_queued);       // user page -- display all queued tickets
router.get('/my_tickets/:user_id/1', isLoggedIn, general.show_my_tickets_inprogress);   // user page -- display all in-progress tickets
router.get('/my_tickets/:user_id/2', isLoggedIn, general.show_my_tickets_solved);       // user page -- display all solved tickets
router.get('/my_tickets/:user_id/:ticket_id',isLoggedIn, general.show_edit_ticket);  // user making edit to his/her tickets
router.post('/my_tickets/:user_id/:ticket_id',isLoggedIn, general.edit_ticket);      


/*************** ADMIN ROUTES *****************/
router.get('/tickets',isLoggedIn,hasAdminRights);   // if user is not logged in, redirect to signup page, else admin/user tickets page
router.get('/tickets/:user_id/0', hasAuth, admins.show_tickets_queued);             // admin page -- display all queued tickets
router.get('/tickets/:user_id/1', hasAuth, admins.show_tickets_inprogress);         // admin page -- display all in-progress tickets
router.get('/tickets/:user_id/2', hasAuth, admins.show_tickets_solved);             // admin page -- display all solved tickets
router.get('/ticket/:user_id/:ticket_id/respond', hasAuth, admins.show_respond_ticket);     // respond to ticket
router.post('/ticket/:user_id/:ticket_id/respond', hasAuth, admins.respond_ticket);

/********* DELETE ROW FROM tickets TABLE *************/
router.post('/ticket/:ticket_id/delete', hasAuth, admins.delete_ticket);       // using post and different route
router.post('/ticket/:ticket_id/delete-json',hasAuth, admins.delete_ticket_json);  // using ajax

module.exports = router;