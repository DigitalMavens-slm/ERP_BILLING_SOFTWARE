const express = require("express");
const router = express.Router();
const {
  getInventory,
  addItem,
  deleteItem,
  updateItem,
} = require("../Controller/InventoryController");

// Routes
router.get("/inventory", getInventory);
router.post("/inventory", addItem);
router.delete("inventory/:id", deleteItem);
router.put("inventory/:id", updateItem); // optional update

module.exports = router;
