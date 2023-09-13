const express = require("express");
const router = express.Router();
const sale = require('../controllers/saleController');
const authenticateToken = require('../middleware/authenticateToken');
const roles = require('../utils/roles');


router.use(authenticateToken([roles.admin,roles.manager,roles.seller]));
router.route("/getList").get(sale.getList);
router.route("/create").post(sale.create);
router.route("/update/:id").put(sale.update);
router.route("/delete/:id").delete(sale.remove);

module.exports = router