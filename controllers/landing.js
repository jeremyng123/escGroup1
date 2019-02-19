const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' });
};

exports.submit_lead = function(req, res, next) {
    console.log('lead email:', req.body.lead_email);

    return models.lead.create({
        email: req.body.lead_email
    }).then(lead=> {    // lead is a variable sent to the /leads/
        res.redirect('/leads')  // redirect to a new webpage when we submit email
    });
};

/* findAll() is a promise. what it means will be covered in details later.
    This method runs asynchronously*/
exports.show_leads = function(req, res, next) {
    return models.lead.findAll().then(leads=> {
        res.render('landing', { title: 'Express', leads: leads });
    });
};

exports.show_lead = function(req, res, next) {
    return models.lead.findOne({
        where : {
            id : req.params.lead_id
        }
    }).then(lead => {
        res.render('lead', { lead : lead });
    });
};

exports.show_edit_lead = function(req, res, next) {
    return models.lead.findOne({
        where : {
            id : req.params.lead_id
        }
    }).then(lead => {
        res.render('lead/edit_lead', { lead : lead });
    });
};

exports.edit_lead = function(req, res, next) {
    // req.params.lead_id  // object
    // req.body.lead_email
    return models.lead.update({
        email: req.body.lead_email
    }, {
        where: {
            id: req.params.lead_id
        }
    }).then(result => {
        res.redirect('/lead/' + req.params.lead_id);
    });
};

exports.delete_lead = function(req, res, next) {
    return models.lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then(result => {
        res.redirect('/leads');
    });
};

exports.delete_lead_json = function(req, res, next) {
    return models.lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then(result => {
        res.send({ msg: "Success" }); // it sends a JSON object
    });
};