module.exports = function(io) {
  var express = require("express");
  var router = express.Router();

  /*************** CONTROLLER *****************/
  let general = require("../controllers/general");
  let admins = require("../controllers/admins");
  let user = require("../controllers/user"); // to direct them to login page!

  /*************** MIDDLEWARE *****************/
  let { isLoggedIn, isVerified, hasAuth, whatRights, welcomeAdmin } = require("../middleware/hasAuth");
  let { send_email } = require("../middleware/email");
  let { any_admin_rtchat } = require("../middleware/any_admin_rtchat");
  let { specific_admin_rtchat} = require("../middleware/specific_admin_rtchat");
  /*************** REAL TIME CHAT DEPENDENCIES *****************/
  /**
   * Use the gravatar module, to turn email addresses into avatar images:
   * for REAL TIME CHAT
   * */
  let rtchat = require("../controllers/chat");

  /*************** HOMEPAGE *****************/
  router.get("/", welcomeAdmin, general.get_welcome);
  router.get("/welcomeAdmin", isLoggedIn, isVerified, hasAuth, general.get_welcome_admin);
  router.get("/consultant", general.get_consultantpage);

  /*************** PROFILE *****************/
  router.get('/profile', general.show_profile);
  router.post('/profile_change', general.profile_change);

  /*************** GENERAL TICKET ROUTES *****************/
  router.get( "/my_ticket/:user_id", isLoggedIn, isVerified, general.show_my_tickets ); // user page -- display all queued tickets
  router.post( "/sort_tickets_user", isLoggedIn, isVerified, general.show_my_tickets_sorted ); // user page -- display all queued tickets sorted
  router.get("/tickets/:user_id/:ticket_id/", isLoggedIn, isVerified, general.show_ticket_messages ); // respond to ticket
  router.post("/tickets/:user_id/:ticket_id/", isLoggedIn, isVerified, general.post_message );
  router.get("/solved/:ticket_id/", isLoggedIn, isVerified, general.ticket_solved );
  router.get("/not_solved/:ticket_id/", isLoggedIn, isVerified, general.ticket_not_solved );
  

  /*************** TICKET CREATION ROUTES *****************/
  router.get("/ticket_form/basics", isLoggedIn, isVerified, general.basics_get); // basics
  router.post("/ticket_form/basics", isLoggedIn, isVerified, general.basics_post);
  router.get("/ticket_form/solutions", isLoggedIn, isVerified, general.solutions_get);
  router.get("/ticket_form/details", isLoggedIn, isVerified, general.details_get);
  router.post("/ticket_form/details", isLoggedIn, isVerified, send_email, general.details_post);
  router.get("/solution_detail", isLoggedIn, isVerified, general.solution_detail);

  /*************** ADMIN ROUTES *****************/
  router.get("/tickets", whatRights); // if user is not logged in, redirect to signup page, else admin/user tickets page
  router.get("/ticket/0/:user_id",isLoggedIn, isVerified, hasAuth, admins.show_tickets_queued); // admin page -- display all queued tickets
  router.post( "/ticket/0/:user_id", isLoggedIn, isVerified, hasAuth, admins.sort_0_tickets ); 
  router.get("/ticket/1/:user_id", isLoggedIn, isVerified, hasAuth, admins.show_tickets_inprogress ); // admin page -- display all in-progress tickets
  router.post( "/ticket/1/:user_id", isLoggedIn, isVerified, hasAuth, admins.sort_1_tickets );
  router.get("/ticket/2/:user_id", isLoggedIn, isVerified, hasAuth, admins.show_tickets_solved ); // admin page -- display all solved tickets
  router.post( "/ticket/2/:user_id", isLoggedIn, isVerified, hasAuth, admins.sort_2_tickets );
  router.get("/manage_users", isLoggedIn, isVerified, hasAuth, admins.show_manage_users);
  router.get("/view/:user_id", isLoggedIn, isVerified, hasAuth, admins.show_user_profile);
  router.post("/view/:user_id", isLoggedIn, isVerified, hasAuth, admins.edit_user_profile);
  
  router.get("/flag_ticket/:ticket_id/", isLoggedIn, isVerified, hasAuth, admins.flag_ticket );

  /********* DELETE ROW FROM tickets TABLE *************/
  router.post("/ticket/:ticket_id/delete", admins.delete_ticket); // using post and different route
  router.post("/ticket/:ticket_id/delete-json", admins.delete_ticket_json); // using ajax
  
  /***************************
   * REAL TIME CHAT ROUTE
   *  ************************/
  // this is changed
  router.get("/room", isLoggedIn, rtchat.room);
  router.get("/create", isLoggedIn, rtchat.create);
  router.get("/chat/:id", isLoggedIn, rtchat.chat);
  router.get('/select', isLoggedIn, rtchat.select);
  router.get('/chat/admin/:admin_id', isLoggedIn, specific_admin_rtchat, rtchat.chat_with_specific_admin);
  router.get('/chat/all_admin/:user_id', isLoggedIn, any_admin_rtchat, rtchat.all_admin_redirect); // todo: add middle ware to send email here
  router.get('/chat/user/:user_id', isLoggedIn, rtchat.chat_with_any_admin);


  /*************** UPLOAD IMAGES *****************/
  var multer = require("multer");
  var path = require("path");
  var fs = require("fs");

  var storage = multer.diskStorage({
    destination: function(req, file, cb, res) {
      cb(
        null,
        "public/users/" + req.user.userId + "/tickets/" + req.user.ticketCount
      );
    },

    filename: function(req, file, cb, res) {
      var name =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      cb(null, name);
      return name;
    }
  });

  
  var upload = multer({
    storage: storage
  });


  function checkUploadPath(req, res, next) {
    const uploadPath = "public/users/" + req.user.userId + "/tickets/" + req.user.ticketCount;
    fs.exists(uploadPath, function(exists) {
      if (exists) {
        return next();
      } else {
        fs.mkdir(uploadPath, { recursive: true }, function(err) {
          if (err) {
            console.log("Error in folder creation: \n" + err);
            return next();
          }
          return next();
        });
      }
    });
  }

  router.post("/upload", checkUploadPath, upload.single("file"), function(req, res) {
    res.json({
      location:
        "users/" + req.user.userId + "/tickets/" + req.user.ticketCount + "/" + req.file.filename
    });
  });

  /************************ upload image for carousel notification ********************/
  router.get('/uploadCarousel', function(req, res) {
    return res.render('upload_car/upload_note', {user: req.user});
  });

  var carouStorage = multer.diskStorage({
    destination: function(req, file, cb, res) {
      cb( null,"public/images/carousel/" );
    },

    filename: function(req, file, cb, res) {
      var name = 'slide1.jpg';
      cb(null, name);
      return name;
    }
  });


  var carouUpload = multer({
    storage: carouStorage
  });

  router.post("/uploadCarousel", carouUpload.single("file"), function(req, res) {
    res.json({

      location:
      "images/carousel/" + 'slide1.jpg'

    });
  });

  return router;
};

