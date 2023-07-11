var Student = require("./model/student");

Student.all(function (err, data) {
    if (err) {
        throw err;
    }

    console.log(data);
});

Student.save({}, callback);
var s = new Student("Baska", "5th");
s.save();
