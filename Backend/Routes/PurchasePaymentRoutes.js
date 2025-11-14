const express = require("express");
const router = express.Router();
const purchasePaymentController = require("../Controller/PurchasePaymentController");

// Order matters ⚠️
router.get("/all", purchasePaymentController.getAllPurchasePayments);
router.get("/:purchaseId", purchasePaymentController.getPaymentsByPurchase);
router.post("/purchase-payments", purchasePaymentController.addPurchasePayment);

module.exports = router;
