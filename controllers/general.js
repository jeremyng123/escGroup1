const models = require('../models');
var request = require('request');

exports.get_welcome = function(req, res, next) {
    return res.render('welcome', { title: "Accenture's ACNAPI Portal" , user: req.user });
   // passport session will flood the request with 'user' when there is one in session
};


/********************* TICKET CREATION **********************/
exports.basics_get = function(req, res, next) {
    return res.render('ticket/ticket_form/basics', {title: "Creation process: Ticket Basics", user: req.user});
}

exports.basics_post = function(req, res, next) {
    return res.redirect('/ticket_form/solutions?q=' + req.body.q_content);
}

exports.solutions_get = function(req, res, next) {
    var url = 'localhost';
    var options = {
        host: url + ':5000/smart_solution/' + req.query.q,
        port: 80,
        path: '/resource?id=foo&bar=baz',
        method: 'POST'
      };
      
    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();

    return res.render('ticket/ticket_form/solutions', {title: "Suggested Solutions", user: req.user, solution: result});


}


exports.details_get = function(req, res, next) {
    return res.render('ticket/ticket_form/details', { title: "ACNAPI Ticket Form", user: req.user });
};

exports.details_post = function(req, res, next) {
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


/******************** SHOW TICKETS ***************************/
exports.show_my_tickets_queued = function(req, res, next) {
    return models.ticket.findAll({
        where : {
            fk_userId   : req.user.userId ,
            tag         : 0
        },include: [ models.message ]
    }).then(tickets=> {
        console.log("USER SHOW TICKETS\n\n" + JSON.stringify(tickets));
        res.render('ticket/user_0', { title: "ACNAPI Tickets - Queued", tickets: tickets, user: req.user , subtitle: "queued" });
    });
};

exports.show_my_tickets_inprogress = function(req, res, next) {
    return models.ticket.findAll({
        where : {
            fk_userId   : req.user.userId ,
            tag         : 1
        },include: [ models.message ]
    }).then(tickets=> {
        res.render('ticket/user_1', { title: "ACNAPI Tickets - In Progress", tickets: tickets, user: req.user , subtitle: "in-progress" });
    });
};

exports.show_my_tickets_solved = function(req, res, next) {
    return models.ticket.findOne({
        where : {
            fk_userId   : req.user.userId ,
            tag         : 2
        },include: [ models.message ]
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

