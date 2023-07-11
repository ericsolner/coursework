const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get("/api", (req, res) => db.Donut.findAll({}).then(data => res.json(data)));
app.post("/api", (req, res) => db.Donut.create(req.body).then(data => res.json(data)));
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () =>{
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
})
