var express = require("express");
var bodyParser = require("body-parser");
var exprhbs = require("express-handlebars");
var routes = require("./routes");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exprhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/productZone"
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});