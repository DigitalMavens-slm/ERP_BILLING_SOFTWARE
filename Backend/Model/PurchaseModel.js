const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
