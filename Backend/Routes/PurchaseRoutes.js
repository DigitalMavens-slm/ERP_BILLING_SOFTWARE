// const express = require("express");
// const router = express.Router();
// const purchaseController = require("../Controller/PurchaseController");

// // ✅ Don't call the function here
// // router.get("/", purchaseController.getAllPurchases);
// // router.post("/purchases", purchaseController.createPurchase);
// router.post("/purchase-payments", purchaseController.createPurchase);
// // router.get("/allpurchase", purchaseController.getAllPurchases);
// router.get("/purchase/:id", purchaseController.getPurchaseById);
// router.get("/purchases/search", purchaseController.searchPurchase);
// // router.get("/:id", purchaseController.getPurchaseById);
// // router.put("/:id", purchaseController.updatePurchase);
// // router.delete("/:id", purchaseController.deletePurchase);

// module.exports = router;






const express = require("express");
const router = express.Router();
const purchaseController = require("../Controller/PurchaseController");

// ✅ Create new purchase
router.post("/purchases", purchaseController.createPurchase);

// ✅ Get all purchases
router.get("/purchases", purchaseController.getAllPurchases);

// ✅ Get single purchase
// router.get("/purchases/id/:id", purchaseController.getPurchaseById);

// ✅ Search purchase (for frontend suggestions)
router.get("/purchases/search", purchaseController.searchPurchase);

// ✅ (Optional) Send purchase PDF/email
router.post("/purchases/send", purchaseController.sendPurchase);

module.exports = router;

