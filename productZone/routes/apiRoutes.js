var router = require("express").Router();
var productController = require("../controllers/productController");

// localhost/products/
router.get("/:id", productController.find);
router.post("/new", productController.create);
router.get("/", productController.findAll);
router.delete("/:id", productController.delete);

module.exports = router;