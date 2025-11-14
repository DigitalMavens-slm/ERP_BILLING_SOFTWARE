const express = require("express");
const router = express.Router();
const { getCustomerLedger ,getAllLedgers,getCustomerSuggestions,getCustomer} = require("../Controller/LedgerController");

router.get("/ledger/:customerId", getCustomerLedger);
router.get("/ledger",getAllLedgers)

router.get("/suggest/customers",getCustomerSuggestions)
router.get("/customers/:id",getCustomer)

module.exports = router;
