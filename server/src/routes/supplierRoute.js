const express = require('express');
const router = express.Router();
const roles = require('../utils/roles');
const supplierController = require('../controllers/suppliersController');
const authenticateToken = require('../middleware/authenticateToken');
const uplaod = require("../middleware/upload");


router.use(authenticateToken([roles.admin,roles.manager]));

router.route('/create').post(uplaod.single('file'), supplierController.createSupplier);
router.route('/getList').get(supplierController.getListSupplier);
router.route('/update/:id').put(uplaod.single('file'), supplierController.updateSupplier);
router.route('/delete/:id').delete(supplierController.deleteSupplier);


module.exports = router