const express = require("express");
const router = express.Router();
const exchangeRate = require("../controllers/exchangeRateController");
const authenticateToken = require("../middleware/authenticateToken");
const roles = require("../utils/roles");

router.use(authenticateToken([roles.admin, roles.manager]));
router.route("/update").put(exchangeRate.update);
router.route("/get").get(exchangeRate.getReilCurrency);

module.exports = router;
