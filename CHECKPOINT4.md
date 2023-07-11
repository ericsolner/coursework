# CHECKPOINT 4
In this fourth installment of the check point series, we'll tackle MVC, Sequelize and Mongoose!
## MORE MVC
### *M*odel - *V*iew - *C*ontroller

Model - the parts of the app that connect to the database. In that case, that means the part of your code that uses ORMs (or even hand-created ones). In some definitions, we'll even include the database itself.

View - the parts of the app that display your screens (and the data connected with those screens). In most of our examples, the view will be the HTML and Handlebars code.

Controller - this is the tricky part because it can be somewhat subjective depending on the patterns being used. Here's a solid way to consider things, though. The controller should control the application interacts with the views and models. So we can consider the callback functions of the routes our controller. Confusing? Don't worry, we'll get deeper ✌

#### Models
Depending on the database used, we have two primary ways of creating models with ORMs Sequelize (MYSQL) and Mongoose (MONGOOSE).

First, let's look at a Sequelize Model ➡
```JavaScript
    /**
     * Let's create a mongoose model
     **/
     module.exports = function (sequelize, DataTypes) {
         var Chocolate = sequelize.define("Chocolate", {
             name: DataTypes.STRING, // Note, we could also use the object structure to provide MORE details about this column!
             choc_type: {
                 type: DataTypes.STRING,
                 defaultValue: "bavarian"
             },
             is_fav: {
                 type: DataTypes.BOOLEAN,
                 defaultValue: false
             }
         });

         return Chocolate;
     }
```
Above, we've defined a basic model that will be able to be used in our application. But it doesn't touch on _relationships_ between two models. Let's explore that relationship with _associations_

##### Associations
An association links (think about how joins work) two tables together. Depending on the type of association, that link will result in a new column being added (we call this a join column sometimes).

Let's look at a shopping app that has products and departments. You can say that a product _belongs to_ a department. This means each product can belong to only one department. You can also say that a department _has many_ products (it should, what kind of department would this be if it didn't!?)

```JavaScript
/* in models/product.js */
module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
    });

    Product.associate = function (models) {
        Product.belongsTo(models.Department, {
            foreignKey: { // this is the column we'll use to link the product to a department (so we don't want it to be null)
                allowNull: false
            }
        });
    };

    return Product;
}
```

Now, let's set up a Department model!

```JavaScript
/* in models/department.js */
module.exports = function (sequelize, DataTypes) {
    var Department = sequelize.define("Department", {
        name: DataTypes.STRING,
    });

    /* Here, we'll say that a Department has many products, which is a natural state since we want to be able to find lots of products in a given department */
    Department.associate = function (models) {
        Department.hasMany(models.Product, {
            // here we're saying to delete all of the products associated with this department when the DEPARTMENT is deleted.
            onDelete: "cascade"
        });
    };

    return Product;
}

```
Now, with this configuration, we can call for a department AND all of the products in that department if we want, though we don't have to (hint: use the include: [db.model_name] key when selecting ⭐)

Now that we've seen this with Sequelize, let's check out models using a document database (NOSQL). We'll use Mongoose (since ORMs are easier to work with ✌)

```JavaScript
/* in models/product.js*/

// Here, we need two things to make this work
// mongoose and the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// To get started, we create a schema (much like we did with DEFINE in sequelize) that will represent our model
var ProductSchema = new Schema({
    // We are providing details on how this field should behave - remember Mongo doesn't have rules, we use mongoose to fill in the gap
  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  },
  price: {
    type: Number,
    required: "Price is Required",
    validate: [
      function(input) {
        return input > 0;
      },
      "Price should be > 0"
    ]
  },
});

// Using the Schema we just created, let's create
// a model to actually be used in our application. NOTE We don't
// use the Schema, we use the model.
var Product = mongoose.model("Product", ProductSchema);

// Export the Product model
module.exports = Product;
```

Officially, Mongo doesn't support relationships the way a relational database would but again, Mongoose gives us a way to do that.

Let's continue with our Product / Department relationships.
```JavaScript
/* in models/department.js*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  },
  // Here we're telling Mongoose to create
  // a field called "products" that we can
  // use to link to a Product document. Specifically we
  // use the _id of that model (hence the description below)
  // In the database, this will show up as a list of _id's
  // if we use the populate function when selecting, we'll end up with the actual Product.
  products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
  ]
});

var Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;
```


#### Controllers
With the models out of the way, we can now look at the controllers. Depending on the structure of your application you can organize your code as follows:

```JavaScript
/* in controllers/productController.js */
var db = require("../models");

module.exports = {
  findOne: function(req, res) {
    db.Product
      .findOne(req.query)
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  },
  create: function(req, res) {
    db.Product
      .create(req.body)
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  },
  delete: function(req, res) {
    db.Product
      .remove({ _id: req.params.id })
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  }
};
```
If you look at the pattern here, these look like the callbacks we use for the api routes. Let's break that down and have a look how we'll use these there:

```JavaScript
/* in routes/api/product.js */
// WHY A ROUTER?!??!?!? It's because we aren't passing in the app
// like we've done in the past. By creating a router, we can treat it the same as we would the app.
var router = require("express").Router();
var productController = require("../../controllers/productController");

// Here are the routes but we reference the actual function 
// attached to the controller.
router.get("/:id", productController.findOne);
router.post("/", productController.create);
router.delete("/:id", productController.delete);

module.exports = router;
```