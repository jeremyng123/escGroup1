const models = require('../models');

exports.get_welcome = function(req, res, next) {
    return res.render('welcome', { title: "Accenture's ACNAPI Portal" , user: req.user });
   // passport session will flood the request with 'user' when there is one in session
};

exports.show_ticket_form = function(req, res, next) {
    return res.render('ticket/ticket_form', { title: "ACNAPI Ticket Form", user: req.user });
};

exports.create_ticket = function(req, res, next) {
    return models.ticket.create({
        fk_userId           : req.user.userId,
        topic               : req.body.topic
    }).then(ticket=> {
        return models.message.create({
            fk_userId       : req.user.userId,
            fk_ticketId     : ticket.ticketId,
            content         : req.body.content
        }).then(success => {
            res.redirect('/')  // redirect to a new webpage as we submit email
        })
    }).catch(err=>console.log("error again!" + err));
        
};

exports.show_my_tickets_queued = function(req, res, next) {
    return models.user.findOne({
        where : { userId : req.user.userId },
        include: [{ 
            model : models.ticket, 
            where : { tag : 0 }
        }]
    }).then(tickets=> {
        res.render('ticket/user_0', { title: "ACNAPI Tickets - Queued", tickets: tickets, user: req.user , subtitle: "queued" });
    });
};

exports.show_my_tickets_inprogress = function(req, res, next) {
    return models.user.findOne({
        where : { userId : req.user.userId },
        include: [{ 
            model : models.ticket, 
            where : { tag : 1 }
        }]
    }).then(tickets=> {
        res.render('ticket/user_1', { title: "ACNAPI Tickets - In Progress", tickets: tickets, user: req.user , subtitle: "in-progress" });
    });
};

exports.show_my_tickets_solved = function(req, res, next) {
    return models.user.findOne({
        where : { userId : req.user.userId },
        include: [{ 
            model : models.ticket, 
            where : { tag : 2 }
        }]
    }).then(tickets=> {
        res.render('ticket/user_2', { title: "ACNAPI Tickets - Solved", tickets: tickets, user: req.user , subtitle: "solved" });
    });
};

exports.show_edit_ticket = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            ticketId : req.params.ticket_id
        }
    }).then(ticket => {
        res.render('ticket/edit_ticket', { title: "ACNAPI Ticket - Edit", ticket : ticket, user: req.user });
    });
};

exports.edit_ticket = function(req, res, next) {
    return models.ticket.update({
        topic: req.body.topic,
        description: req.body.description
        
    }, {
        where: {
            ticketId: req.params.ticket_id
        }
    }).then(result => {
        res.redirect('/my_tickets/' + req.user.userId);
    });
};

