const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' });
};

exports.submit_lead = function(req, res, next) {
    console.log('lead email:', req.body.lead_email);

    return models.lead.create({
        email: req.body.lead_email
    }).then(lead=> {
        res.redirect('/leads')  // redirect to a new webpage when we submit email
    })
};

/* findAll() is a promise. what it means will be covered in details later.
    This method runs asynchronously*/
exports.show_leads = function(req, res, next) {
    models.lead.findAll().then(leads=> {
        res.render('landing', { title: 'Express', leads: leads });
    })
    
};