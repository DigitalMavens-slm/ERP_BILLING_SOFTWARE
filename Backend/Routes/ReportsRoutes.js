const express = require("express");
const router = express.Router();
const {
  getSalesSummary,
  getPurchaseSummary,
  getInventorySummary,
  getFinanceSummary,
} = require("../Controller/ReportsController");


router.get("/reports/sales-summary", getSalesSummary);
router.get("/reports/purchase-summary", getPurchaseSummary);
router.get("/reports/inventory-summary", getInventorySummary);
router.get("/reports/finance-summary", getFinanceSummary);

module.exports = router;
