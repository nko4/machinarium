// Generated by CoffeeScript 1.6.3
/*
Module dependencies.
*/


(function() {
  var app, compile, express, http, jade, nib, path, routes, stylus, user;

  require('nko')("Gmazt4YixQu2r1Od");

  express = require("express");

  jade = require("jade");

  stylus = require("stylus");

  nib = require("nib");

  routes = require("./routes");

  user = require("./routes/user");

  http = require("http");

  path = require("path");

  app = express();

  compile = function(str, path) {
    return stylus(str).set("filename", path).use(nib());
  };

  app.set("port", process.env.PORT || 8000);

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");

  app.use(express.favicon());

  app.use(express.logger("dev"));

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(app.router);

  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));

  app.use(express["static"](path.join(__dirname, "public")));

  if ("production" === app.get("env")) {
    app.use(express.errorHandler());
  }

  app.get("/", routes.index);

  app.get("/users", user.list);

  http.createServer(app).listen(app.get("port"), function() {
    if (process.getuid() === 0) {
      require("fs").stat(__filename, function(err, stats) {
        if (err) {
          return console.error(err);
        }
        return process.setuid(stats.uid);
      });
    }
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
