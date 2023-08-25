const express = require("express");
const router = express.Router();
const roles = require("../utils/roles");
const authenticateToken = require("../middleware/authenticateToken");
const receiveproductController = require("../controllers/receiveproductController");

router.use(authenticateToken([roles.manager,roles.admin]));

router.route('/create').post(receiveproductController.createReceiveproducts);
router.route('/getList').post(receiveproductController.getListReceiveproducts);
router.route('/update/:id').post(receiveproductController.updateReceiveproducts);
router.route('/delete/:id').post(receiveproductController.deleteReceiveproducts);

module.exports = router