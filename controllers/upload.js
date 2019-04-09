const models = require('../models');
var multer = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: function(req, file, cb, res) {
    cb(null, 'public/static/dist/uploads');
  },

  filename: function(req, file, cb, res) {
    var name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, name);
    return name;
  }
});
var upload = multer({
  storage: storage
});


exports.uploadImage = upload.single('file'), function(req,res){
    return mkdirp('./public/users/' + req.user.userId + "/tickets/" + req.user.ticketCount, function(err){
        if (err) console.log("Error in making directory! " + err.message);
    }).then(()=>{
      res.json({
        "location": '/users/' + req.params.user_id + "/tickets/" + req.user.ticketCount+ "/" + req.file.filename
      });
    })   
}