const express = require("express");
const router = express.Router();
const paymentType = require('../controllers/paymentTypeController');
const authenticateToken = require('../middleware/authenticateToken');
const roles = require('../utils/roles');


router.use(authenticateToken([roles.admin,roles.manager]));
router.route("/getList").get(paymentType.getList);
router.route("/create").post(paymentType.create);
router.route("/update/:id").put(paymentType.update);
router.route("/delete/:id").delete(paymentType.remove);

module.exports = router