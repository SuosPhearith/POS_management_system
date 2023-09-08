const express = require("express");
const router = express.Router();
const product = require('../controllers/productController');
const authenticateToken = require('../middleware/authenticateToken');
const roles = require('../utils/roles');
const upload = require('../middleware/upload');

router.use(authenticateToken([roles.admin,roles.manager]));

router.route('/create').post(upload.single('file'), product.createProduct);
router.route('/getList').get(product.getListProduct);
router.route('/update/:id').put(upload.single('file'), product.updateProduct);
router.route('/delete/:id').delete(product.deleteProduct);
router.route('/add/:id').put(product.addStock);

module.exports = router