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
  var gravatar = require("gravatar");

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

  /********* REAL TIME CHAT ROUTER *************/
  router.get("/room", rtchat.room);
  router.get("/create", rtchat.create);
  router.get("/chat/:id", rtchat.chat);

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

  /*****************
   * REAL TIME CHAT
   * ****************/

  // Initialize a new socket.io application, named 'chat'
  var chat = io.on("connection", function(socket) {
    // When the client emits the 'load' event, reply with the
    // number of people in this chat room

    socket.on("load", function(data) {
      var room = findClientsSocket(io, data);

      if (room.length === 0) {
        console.log("room.length === 0  \n\n" + room);
        socket.emit("peopleinchat", { number: 0 });
      } else if (room.length <= 2) {
        console.log("room.length <= 2  \n\n" + room);
        socket.emit("peopleinchat", {
          number: 1,
          user: room[0].username,
          avatar: room[0].avatar,
          id: data
        });
      } else if (room.length > 2) {
        console.log("room.length > 2  \n\n" + room);
        chat.emit("tooMany", { boolean: true });
      }
    });

    // When the client emits 'login', save his name and avatar,
    // and add them to the room
    socket.on("login", function(data) {
      console.log("logged in !!!\n\n" + data);
      var room = findClientsSocket(io, data.id);
      // Only two people per room are allowed
      if (room.length < 2) {
        // Use the socket object to store data. Each client gets
        // their own unique socket object

        socket.username = data.user;
        socket.room = data.id;
        socket.avatar = gravatar.url(data.avatar, {
          s: "140",
          r: "x",
          d: "mm"
        });

        // Tell the person what he should use for an avatar
        socket.emit("img", socket.avatar);

        // Add the client to the room
        socket.join(data.id);

        if (room.length == 1) {
          var usernames = [],
            avatars = [];

          usernames.push(room[0].username);
          usernames.push(socket.username);

          avatars.push(room[0].avatar);
          avatars.push(socket.avatar);

          // Send the startChat event to all the people in the
          // room, along with a list of people that are in it.

          chat.in(data.id).emit("startChat", {
            boolean: true,
            id: data.id,
            users: usernames,
            avatars: avatars
          });
        }
      } else {
        socket.emit("tooMany", { boolean: true });
      }
    });

    // Somebody left the chat
    socket.on("disconnect", function() {
      // Notify the other person in the chat room
      // that his partner has left

      socket.broadcast.to(this.room).emit("leave", {
        boolean: true,
        room: this.room,
        user: this.username,
        avatar: this.avatar
      });

      // leave the room
      socket.leave(socket.room);
    });

    // Handle the sending of messages
    socket.on("msg", function(data) {
      // When the server receives a message, it sends it to the other person in the room.
      socket.broadcast
        .to(socket.room)
        .emit("receive", { msg: data.msg, user: data.user, img: data.img });
    });
  });

  function findClientsSocket(io, roomId, namespace) {
    var res = [],
      ns = io.of(namespace || "/chat"); // the default namespace is "/"

    if (ns) {
      for (var id in ns.connected) {
        if (roomId) {
          var index = ns.connected[id].rooms.indexOf(roomId);
          if (index !== -1) {
            res.push(ns.connected[id]);
          }
        } else {
          res.push(ns.connected[id]);
        }
      }
    }
    return res;
  }
  return router;
};
