const express = require("express");
const router = express.Router();
const categories = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticateToken');
const roles = require('../utils/roles');
const upload = require("../middleware/upload");


router.use(authenticateToken([roles.admin,roles.manager]));
router.route("/getList").get(categories.getListCategory);
router.route("/create").post(upload.single('file'), categories.createCategory);
router.route("/update/:id").put(upload.single('file'), categories.updateCategory);
router.route("/delete/:id").delete(categories.deleteCategory);

module.exports = router