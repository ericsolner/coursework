// require the connection for database calls
var connection = require("../config/connection");
var Student = function(name, grade) {
    this.name = name;
    this.grade = grade;
}

// We don't need an object to search, so we'll 
// add it directly to the function
// gather all records
Student.all = function(megan) {
    // request all records from the database
    connection.query("SELECT * FROM STUDENT;", megan);
}
// We don't need an object to search, so we'll 
// add it directly to the function
// criteria = { "name" : "sarah"} or {"id": 1} for example
Student.find = function (criteria, cb) {
    connection.query("SELECT * FROM STUDENT WHERE ?", criteria, cb);
}
// We add the method to the prototype
// since we are having an object to save
// create a record
Student.prototype.create = function (cb) {
    var studentData = {
        name: this.name,
        grade: this.grade
    };
    connection.query("INSERT INTO STUDENT SET ?", studentData, cb);
}
// TODO update a record
// TODO delete a record
module.exports = Student;