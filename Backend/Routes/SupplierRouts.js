const express = require("express");
const router = express.Router();
const { getSuppliers, addSupplier, deleteSupplier } = require("../Controller/SupplierController");

router.get("/suppliers", getSuppliers);
router.post("/suppliers", addSupplier);
router.delete("/suppliers/:id", deleteSupplier);

module.exports = router;
