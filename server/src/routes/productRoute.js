const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const authenticateToken = require("../middleware/authenticateToken");
const roles = require("../utils/roles");
const upload = require("../middleware/upload");

router
  .route("/create")
  .post(
    authenticateToken([roles.admin, roles.manager]),
    upload.single("file"),
    product.createProduct
  );
router
  .route("/getList")
  .get(
    authenticateToken([roles.admin, roles.manager, roles.seller]),
    product.getListProduct
  );
router
  .route("/update/:id")
  .put(
    authenticateToken([roles.admin, roles.manager]),
    upload.single("file"),
    product.updateProduct
  );
router
  .route("/delete/:id")
  .delete(
    authenticateToken([roles.admin, roles.manager]),
    product.deleteProduct
  );
router
  .route("/add/:id")
  .put(authenticateToken([roles.admin, roles.manager]), product.addStock);

module.exports = router;
