
const express = require("express");
const router = express.Router();
const {
  getPurchases,
  addPurchase,
  deletePurchase,
  searchField,
} = require("../Controller/PurchaseController");

// ✅ Routes
router.get("/purchases", getPurchases);
router.post("/purchases", addPurchase);
router.delete("/purchases/:id", deletePurchase);
router.get("/purchases/searchField", searchField);

module.exports = router;

