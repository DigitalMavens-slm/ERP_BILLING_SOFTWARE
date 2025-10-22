const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sku: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  minStock: { type: Number, default: 0 },
  unitPrice: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

// Automatically update "lastUpdated" when saving
inventorySchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
