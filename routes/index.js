module.exports = function(io) {
  var express = require("express");
  var router = express.Router();

  /*************** CONTROLLER *****************/
  let general = require("../controllers/general");
  let admins = require("../controllers/admins");
  let user = require("../controllers/user"); // to direct them to login page!

  /*************** MIDDLEWARE *****************/
  let { isLoggedIn, hasAuth, whatRights } = require("../middleware/hasAuth");
  let { send_email } = require("../middleware/email");

  /*************** REAL TIME CHAT DEPENDENCIES *****************/
  /**
   * Use the gravatar module, to turn email addresses into avatar images:
   * for REAL TIME CHAT
   * */
  let rtchat = require("../controllers/chat");

  /*************** HOMEPAGE *****************/
  router.get("/", general.get_welcome);

  /*************** GENERAL TICKET ROUTES *****************/
  router.get(
    "/my_tickets/:user_id/0",
    isLoggedIn,
    general.show_my_tickets_queued
  ); // user page -- display all queued tickets
  router.get(
    "/my_tickets/:user_id/1",
    isLoggedIn,
    general.show_my_tickets_inprogress
  ); // user page -- display all in-progress tickets
  router.get(
    "/my_tickets/:user_id/2",
    isLoggedIn,
    general.show_my_tickets_solved
  ); // user page -- display all solved tickets
  router.get(
    "/my_tickets/:user_id/:ticket_id",
    isLoggedIn,
    general.show_edit_ticket
  ); // user making edit to his/her tickets
  router.post(
    "/my_tickets/:user_id/:ticket_id",
    isLoggedIn,
    general.edit_ticket
  );

  /*************** TICKET CREATION ROUTES *****************/
  router.get("/ticket_form/basics", isLoggedIn, general.basics_get); // basics
  router.post("/ticket_form/basics", isLoggedIn, general.basics_post);
  router.get("/ticket_form/solutions", isLoggedIn, general.solutions_get);
  router.get("/ticket_form/details", isLoggedIn, general.details_get);
  router.post(
    "/ticket_form/details",
    isLoggedIn,
    send_email,
    general.details_post
  );
  router.get('/solution_detail', isLoggedIn, general.solution_detail);
  
  /*************** ADMIN ROUTES *****************/
  router.get("/tickets", whatRights); // if user is not logged in, redirect to signup page, else admin/user tickets page
  router.get(
    "/tickets/:user_id/0",
    isLoggedIn,
    hasAuth,
    admins.show_tickets_queued
  ); // admin page -- display all queued tickets
  router.get(
    "/tickets/:user_id/1",
    isLoggedIn,
    hasAuth,
    admins.show_tickets_inprogress
  ); // admin page -- display all in-progress tickets
  router.get(
    "/tickets/:user_id/2",
    isLoggedIn,
    hasAuth,
    admins.show_tickets_solved
  ); // admin page -- display all solved tickets
  router.get(
    "/ticket/:user_id/:ticket_id/respond",
    isLoggedIn,
    hasAuth,
    admins.show_respond_ticket
  ); // respond to ticket
  router.post(
    "/ticket/:user_id/:ticket_id/respond",
    isLoggedIn,
    hasAuth,
    admins.respond_ticket
  );

  /********* DELETE ROW FROM tickets TABLE *************/
  router.post(
    "/ticket/:ticket_id/delete",
    isLoggedIn,
    hasAuth,
    admins.delete_ticket
  ); // using post and different route
  router.post(
    "/ticket/:ticket_id/delete-json",
    isLoggedIn,
    hasAuth,
    admins.delete_ticket_json
  ); // using ajax

  /***************************
   * REAL TIME CHAT ROUTE
   *  ************************/
  // this is changed
  router.get("/room", rtchat.room);
  router.get("/create", rtchat.create);
  router.get("/chat/:id", rtchat.chat);
  router.get('/select', rtchat.select);
  router.get('/chat/admin/:admin_id', rtchat.chat_with_specific_admin);
  router.get('/chat/all_admin/:user_id', rtchat.all_admin_redirect); // todo: add middle ware to send email here
  router.get('/chat/user/:user_id', rtchat.chat_with_any_admin);


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
    const uploadPath =
      "public/users/" + req.user.userId + "/tickets/" + req.user.ticketCount;
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

  router.post("/upload", checkUploadPath, upload.single("file"), function(
    req,
    res
  ) {
    res.json({
      location:
        "users/" +
        req.user.userId +
        "/tickets/" +
        req.user.ticketCount +
        "/" +
        req.file.filename
    });
  });

  
  return router;
};
