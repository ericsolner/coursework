var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    name: {
        type: String,
    },
});

var Department = mongoose.model("Department", departmentSchema);

module.exports = Department;