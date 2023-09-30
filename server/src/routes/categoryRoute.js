const express = require("express");
const router = express.Router();
const categories = require("../controllers/categoryController");
const authenticateToken = require("../middleware/authenticateToken");
const roles = require("../utils/roles");
const upload = require("../middleware/upload");
router
  .route("/getList")
  .get(
    authenticateToken([roles.admin, roles.manager, roles.seller]),
    categories.getListCategory
  );
router
  .route("/create")
  .post(
    authenticateToken([roles.admin, roles.manager]),
    upload.single("file"),
    categories.createCategory
  );
router
  .route("/update/:id")
  .put(
    authenticateToken([roles.admin, roles.manager]),
    upload.single("file"),
    categories.updateCategory
  );
router
  .route("/delete/:id")
  .delete(
    authenticateToken([roles.admin, roles.manager]),
    categories.deleteCategory
  );

module.exports = router;
