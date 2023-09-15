const express = require("express");
const router = express.Router();
const customer = require("../controllers/customerController");
const authenticateToken = require("../middleware/authenticateToken");
const roles = require("../utils/roles");
const upload = require("../middleware/upload");

router.use(authenticateToken([roles.admin, roles.manager, roles.seller]));
router.route("/getList").get(customer.getList);
router.route("/create").post(upload.single("file"), customer.create);
router.route("/update/:id").put(upload.single("file"), customer.update);
router.route("/delete/:id").delete(customer.remove);

module.exports = router;
