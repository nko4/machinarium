###
Module dependencies.
###
require('nko') "Gmazt4YixQu2r1Od"

express = require("express")
jade = require("jade")
stylus = require("stylus")
nib = require("nib")
routes = require("./routes")
user = require("./routes/user")
http = require("http")
path = require("path")
app = express()

compile = (str, path) ->
  stylus(str).set("filename", path).use nib() 

# all environments
app.set "port", process.env.PORT or 8000
app.set "views", path.join(__dirname, "views")
app.set "view engine", "jade"
app.use express.favicon()
app.use express.logger("dev")
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use stylus.middleware(src: __dirname + '/public', compile: compile)
app.use express.static(path.join(__dirname, "public"))

# production only
app.use express.errorHandler()  if "production" is app.get("env")
app.get "/", routes.index
app.get "/users", user.list
http.createServer(app).listen app.get("port"), ->
  # if run as root, downgrade to the owner of this file
  if process.getuid() is 0
    require("fs").stat __filename, (err, stats) ->
      return console.error(err) if err
      process.setuid stats.uid
  
  console.log "Express server listening on port " + app.get("port")
