var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "school_db"
});

connection.connect(function(err) {
  if (err !== undefined && err !== null) {
    console.log(err);
    throw err;
  }
  console.log("connected as id " + connection.threadId);
  connection.end();
});
