const models = require('../models');
var os = require("os");
var hostname = os.hostname();
let validator = require('validator');
const { isEmpty } = require('lodash');


exports.show_manage_users = function(req, res, next) {
    if (!req.user && !req.user.is_admin) return res.redirect('/users/signup');
    return models.user.findAll({
    }).then(users => {
        return res.render('manage/users_table', { title: 'Tickets - Queued', users: users , user: req.user,  hostname: hostname });
    })
};


exports.show_user_profile = function(req, res, next) {
    if (!req.user && !req.user.is_admin) return res.redirect('/users/signup');
    return models.user.findOne({
        where : { userId : req.params.user_id}
    }).then(u => {
        return res.render('manage/user_profile', { title: u.email + ' Profile', u: u , user: req.user, formData: {} , errors: {}  });
    })
};

exports.edit_user_profile = function(req, res, next) {
    var makeAdmin = false;
    if (req.body.makeAdmin === "admin") makeAdmin = true;
    return models.user.update({
        is_admin    : makeAdmin 
    }, { 
        where: { 
            userId: req.params.user_id
        }
    }).then(() => {
            res.redirect('/')
    }).catch(err => {console.log(err);})
};

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
