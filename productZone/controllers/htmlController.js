var db = require("../models");

module.exports = {
    find: function (req, res) {
        db.Product.find({}).then(function (dbProducts) {
            res.render("home", {
                products: dbProducts
            });
        });
    }
}