const express = require("express");
const router = express.Router();
const exchangeRate = require("../controllers/exchangeRateController");
const authenticateToken = require("../middleware/authenticateToken");
const roles = require("../utils/roles");

router
  .route("/update")
  .put(authenticateToken([roles.admin, roles.manager]), exchangeRate.update);
router
  .route("/get")
  .get(
    authenticateToken([roles.admin, roles.manager, roles.seller]),
    exchangeRate.getReilCurrency
  );

module.exports = router;
