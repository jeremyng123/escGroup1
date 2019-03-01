const models = require('../models');

exports.show_tickets_queued = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 0 },
        include: [ models.user ]
    }).then(tickets => {
            res.render('ticket/admin_0', { tickets: tickets, user: req.user });
        })
};

exports.show_tickets_inprogress = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 1 },
        include: [ models.user ]
    }).then(tickets => {
            res.render('ticket/admin_1', { tickets: tickets, user: req.user });
        })
};

exports.show_tickets_solved = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 2 },
        include: [ models.user ]
    }).then(tickets => {
            res.render('ticket/admin_2', { tickets: tickets, user: req.user });
        })
};

exports.show_respond_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            ticketId : req.params.ticket_id
        },
        include: [ models.user ]
    }).then(ticket => {
        res.render('ticket/respond_ticket', { ticket : ticket, user: req.user });
    }).catch(err=>console.log("No ticket found: " + err));
};

exports.respond_ticket = function(req, res, next) {
    return models.ticket.update({
        responses: req.body.responses,
        tag: 1      // change queued ticket to in-progress ticket
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