const express = require('express');
const router = express.Router();
const roles = require('../utils/roles');
const supplierController = require('../controllers/suppliersController');
const authenticateToken = require('../middleware/authenticateToken');


router.use(authenticateToken([roles.admin,roles.manager]));

router.route('/create').post(supplierController.createSupplier);
router.route('/getList').get(supplierController.getListSupplier);
router.route('/update/:id').put(supplierController.updateSupplier);
router.route('/delete/:id').delete(supplierController.deleteSupplier);


module.exports = router