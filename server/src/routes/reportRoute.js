const express = require("express");
const router = express.Router();
const report = require("../controllers/reportController");
const authenticateToken = require("../middleware/authenticateToken");
const roles = require("../utils/roles");

router.use(authenticateToken([roles.admin, roles.manager]));
router.route("/getListDebt").get(report.getListDebt);
router.route("/getListProductsLess").get(report.getListProductsLess);
router.route("/getListReportData").get(report.getListReportData);
router
  .route("/getListReportDataDateToDate")
  .get(report.getListReportDataDateToDate);

module.exports = router;
