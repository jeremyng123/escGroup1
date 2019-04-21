const models = require('../models');
var os = require("os");
var hostname = os.hostname();

exports.show_tickets_queued = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 0 },
        include: [ models.user ]
    }).then(tickets => {
        return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
    })
};

exports.sort_0_tickets = function(req,res,next) {
    if (req.body.filter === "No Filter" || req.body.filter == null) {
        return models.ticket.findAll({
            where : { tag : 0 },
            include: [ models.user ]
        }).then(tickets => {
            return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
        })
    }
    return models.ticket.findAll({
        where : { 
            tag         : 0,
            topic       : req.body.filter
        },
        include: [ models.user ]
    }).then(tickets => {
        return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
    })
}

exports.show_tickets_inprogress = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 1 },
        include: [ models.user ]
    }).then(tickets => {
        return res.render('ticket/admin_1', { title: 'Tickets - In Progress', tickets: tickets, user: req.user  , subtitle: "in-progress" , hostname: hostname });
    })
};

exports.sort_1_tickets = function(req,res,next) {
    if (req.body.filter === "No Filter" || req.body.filter == null) {
        return models.ticket.findAll({
            where : { tag : 1 },
            include: [ models.user ]
        }).then(tickets => {
            return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
        })
    }
    return models.ticket.findAll({
        where : { 
            tag         : 1,
            topic       : req.body.filter
        },
        include: [ models.user ]
    }).then(tickets => {
        return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
    })
}


exports.show_tickets_solved = function(req, res, next) {
    return models.ticket.findAll({
        where : { tag : 2 },
        include: [ models.user ]
    }).then(tickets => {
        return res.render('ticket/admin_2', { title: 'Tickets - Solved', tickets: tickets, user: req.user  , subtitle: "solved" , hostname: hostname });
    })
};

exports.sort_2_tickets = function(req,res,next) {
    if (req.body.filter === "No Filter" || req.body.filter == null) {
        return models.ticket.findAll({
            where : { tag : 2 },
            include: [ models.user ]
        }).then(tickets => {
            return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
        })
    }
    return models.ticket.findAll({
        where : { 
            tag         : 2,
            topic       : req.body.filter
        },
        include: [ models.user ]
    }).then(tickets => {
        return res.render('ticket/admin_0', { title: 'Tickets - Queued', tickets: tickets, user: req.user , subtitle: "queued" , hostname: hostname });
    })
}


exports.flag_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where   : { ticketId : req.params.ticket_id }
    }).then(ticket => {
            return ticket.update({
                tag :   3
            }).then( () => {
                return res.redirect('/'); 
              })
        }).catch(err => { new Error (err, "Unable to post message...")})
  }

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
