const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' , user: req.user });
   // passport session will flood the request with 'user' when there is one in session
};

exports.submit_ticket = function(req, res, next) {
    console.log('ticket email:', req.body.ticket_email);
    return models.ticket.create({
        email: req.body.ticket_email
    }).then(ticket=> {    // ticket is a variable sent to the /tickets/
        res.redirect('/tickets')  // redirect to a new webpage when we submit email
    });
};

/* findAll() is a promise. what it means will be covered in details later.
    This method runs asynchronously*/
exports.show_tickets = function(req, res, next) {
    return models.ticket.findAll().then(tickets=> {
        res.render('ticket/tickets', { title: 'Express', tickets: tickets });
    });
};

exports.show_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            id : req.params.ticket_id
        }
    }).then(ticket => {
        res.render('ticket/ticket', { ticket : ticket });
    });
};

exports.show_edit_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            id : req.params.ticket_id
        }
    }).then(ticket => {
        res.render('ticket/edit_ticket', { ticket : ticket });
    });
};

exports.edit_ticket = function(req, res, next) {
    // req.params.ticket_id  // object
    // req.body.ticket_email
    return models.ticket.update({
        email: req.body.ticket_email
    }, {
        where: {
            id: req.params.ticket_id
        }
    }).then(result => {
        res.redirect('/ticket/' + req.params.ticket_id);
    });
};

exports.delete_ticket = function(req, res, next) {
    return models.ticket.destroy({
        where: {
            id: req.params.ticket_id
        }
    }).then(result => {
        res.redirect('/tickets');
    });
};

exports.delete_ticket_json = function(req, res, next) {
    return models.ticket.destroy({
        where: {
            id: req.params.ticket_id
        }
    }).then(result => {
        res.send({ msg: "Success" }); // it sends a JSON object
    });
};