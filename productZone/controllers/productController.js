var db = require("../models");

module.exports = {
    find: function (req, res) {
        db.Product.findOne({_id: req.params.id}).then(function(dbProduct) {
            res.json(dbProduct);
        });
    },
    findAll: (req, res)=> {
        db.Product.find({}).then((dbProducts)=> res.json(dbProducts));
    },
    create: function (req, res) {
        // req.body => {name: "name", price: 1.50}
        db.Product.create(req.body).then(function (dbProduct) {
            res.json(dbProduct);
        });
    },
    delete: (req, res)=> {
        const _id = req.params.id;
        db.Product
          .deleteOne({_id})
          .then((dbProduct)=> res.json(dbProduct));
    }
}