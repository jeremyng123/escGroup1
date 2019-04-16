const models = require('../models');
var os = require("os");
var hostname = os.hostname();

exports.show_tickets_queued = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 0 },
        include: [ models.user , models.message]
    }).then(tickets => {
        console.log("JSON ARRAY!:" + JSON.stringify(tickets));
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

exports.show_respond_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            ticketId : req.params.ticket_id
        },
        include: [ models.user , models.message ]
    }).then(ticket => {
        res.render('ticket/respond_ticket', { title: 'Responding Tickets', ticket : ticket, user: req.user  , hostname: hostname });
    }).catch(err=>console.log("No ticket found: " + err));
};

exports.respond_ticket = function(req, res, next) {
    return models.message.update({
        content: req.body.content,
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