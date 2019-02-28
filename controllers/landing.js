const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' , user: req.user });
   // passport session will flood the request with 'user' when there is one in session
};

// exports.submit_ticket = function(req, res, next) {
//     console.log('ticket email:', req.body.ticket_email);
//     return models.ticket.create({
//         email: req.body.ticket_email
//     }).then(ticket=> {    // ticket is a variable sent to the /tickets/
//         res.redirect('/tickets')  // redirect to a new webpage when we submit email
//     });
// };

/* findAll() is a promise. what it means will be covered in details later.
    This method runs asynchronously*/

// var findUserWithFkey = function(tickets){
//     return models.user.findAll({
//         where : {
//             userId : tickets.fUserId
//         }
//     });
// }

exports.show_tickets = function(req, res, next) {
    return models.ticket.findAll({
        include: [ models.user ]
    }).then(tickets => {
            res.render('ticket/admin', { title: 'Express', tickets: tickets, user: req.user });
        })
};

exports.show_my_tickets = function(req, res, next) {
    return models.user.findOne({
        include: [ {
            model : models.ticket
        }]
    }).then(tickets=> {
        console.log(JSON.stringify(tickets + " @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
        res.render('ticket/user', { title: 'Express', tickets: tickets, user: req.user });
    });
};

exports.show_one_ticket = function(req, res, next) {
    return models.user.findOne({
        where : {
            ticketId : req.params.ticket_id
        }
    }).then(ticket => {
        res.render('ticket/ticket', { ticket : ticket, user: req.user });
    });
};

exports.show_edit_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            ticketId : req.params.ticket_id
        }
    }).then(ticket => {
        res.render('ticket/edit_ticket', { ticket : ticket, user: req.user });
    });
};

exports.show_ticket_form = function(req, res, next) {
    return res.render('ticket/ticket_form', { user: req.user });
};

exports.create_ticket = function(req, res, next) {
    return models.ticket.create({
        fk_userId: req.user.userId,
        topic: req.body.topic,
        description: req.body.description
    }).then(ticket=> {    // ticket is a variable sent to the /tickets/
        console.log(ticket);
        res.redirect('/')  // redirect to a new webpage when we submit email
    }).catch(err=>console.log("error again!" + err));
};


exports.edit_ticket = function(req, res, next) {
    // req.params.ticket_id  // object
    // req.body.ticket_email
    return models.ticket.update({
        email: req.body.ticket_email
    }, {
        where: {
            ticketId: req.params.ticket_id
        }
    }).then(result => {
        res.redirect('/ticket/' + req.params.ticket_id);
    });
};

exports.show_respond_ticket = function(req, res, next) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ At show_respond_ticket: " + req.params.ticket_id);
    return models.ticket.findOne({
        where : {
            ticketId : req.params.ticket_id
        }
    }).then(ticket => {
        res.render('ticket/respond_ticket', { ticket : ticket, user: req.user });
    }).catch(err=>console.log("No ticket found: " + err));
};

exports.respond_ticket = function(req, res, next) {
    return models.ticket.update({
        responses: req.body.ticket_response
    }, {
        where: {
            ticketId: req.params.ticket_id
        }
    }).then(result => {
        res.redirect('/tickets');
    });
};

exports.delete_ticket = function(req, res, next) {
    return models.ticket.destroy({
        where: {
            ticketId: req.params.ticket_id
        }
    }).then(result => {
        res.redirect('/tickets');
    });
};

exports.delete_ticket_json = function(req, res, next) {
    return models.ticket.destroy({
        where: {
            ticketId: req.params.ticket_id
        }
    }).then(result => {
        res.send({ msg: "Success" }); // it sends a JSON object
    });
};