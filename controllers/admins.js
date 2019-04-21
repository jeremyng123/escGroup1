const models = require('../models');
var os = require("os");
var hostname = os.hostname();

exports.show_tickets_queued = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 0 },
        include: [ models.user , models.message]
    }).then(tickets => {
        res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
        })
};

exports.show_tickets_inprogress = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 1 },
        include: [ models.user , models.message ]
    }).then(tickets => {
            res.render('ticket/admin_1', { title: 'Tickets - In Progress', tickets: tickets, user: req.user  , subtitle: "in-progress" , hostname: hostname });
        })
};

exports.show_tickets_solved = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 2 },
        include: [ models.user , models.message ]
    }).then(tickets => {
            res.render('ticket/admin_2', { title: 'Tickets - Solved', tickets: tickets, user: req.user  , subtitle: "solved" , hostname: hostname });
        })
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