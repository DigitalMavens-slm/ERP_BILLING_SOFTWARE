const express = require("express");
const router = express.Router();
const CustomerController = require("../Controller/CustomerController");

router.get("/customers", CustomerController.getCustomers);
router.post("/customers", CustomerController.createCustomer);
router.delete("/customers/:id", CustomerController.deleteCustomer);

module.exports = router;
