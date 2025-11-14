

// const mongoose = require("mongoose");
// const Invoice = require("../Model/InvoiceModel/InvoiceCreateModel");
// const Payment = require("../Model/PaymentModel");

// exports.getCustomerLedger = async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     console.log("🔹 Customer ID received:", customerId);

//     if (!mongoose.Types.ObjectId.isValid(customerId)) {
//       return res.status(400).json({ success: false, message: "Invalid customer ID" });
//     }

//     // ✅ Always convert to ObjectId (since Invoice.customerId is ObjectId)
//     const objectId = new mongoose.Types.ObjectId(customerId);

//     // 🧾 Fetch all invoices for this customer
//     const invoices = await Invoice.find({ customerId: objectId })
//       .select("invoiceNum subtotal createdAt _id")
//       .lean();

//     console.log("🧾 Invoices found:", invoices);

//     // 💰 Fetch all payments linked to those invoices
//     const invoiceIds = invoices.map(i => i._id);
//     const payments = await Payment.find({ invoiceId: { $in: invoiceIds } })
//       .select("amount mode txnId date invoiceId")
//       .lean();

//     console.log("💰 Payments found:", payments);

//     const ledgerEntries = [];

//     invoices.forEach(inv => {
//       ledgerEntries.push({
//         date: inv.createdAt,
//         particulars: "Invoice Generated",
//         invoiceNo: inv.invoiceNum,
//         debit: inv.subtotal,
//         credit: "-",
//       });
//     });

//     payments.forEach(pay => {
//       const invoice = invoices.find(i => i._id.toString() === pay.invoiceId.toString());
//       ledgerEntries.push({
//         date: pay.date,
//         particulars: `Payment Received (${pay.mode})`,
//         invoiceNo: invoice?.invoiceNum || "-",
//         debit: "-",
//         credit: pay.amount,
//       });
//     });

//     ledgerEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

//     let balance = 0;
//     const finalLedger = ledgerEntries.map(entry => {
//       if (entry.debit !== "-") balance += entry.debit;
//       if (entry.credit !== "-") balance -= entry.credit;
//       return { ...entry, balance };
//     });

//     res.json({ success: true, ledger: finalLedger });
//   } catch (err) {
//     console.error("❌ Ledger error:", err);
//     res.status(500).json({ success: false, message: "Ledger fetch failed" });
//   }
// };





const mongoose = require("mongoose");
const Ledger = require("../Model/LedgerModel");
const Customer=require("../Model/CustomerModel")

                  // all customer ledger
exports.getAllLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find().populate("customerId", "name");
    res.status(200).json({ ledgers });
  } catch (err) {
    console.error("❌ Error fetching ledgers:", err);
    res.status(500).json({ error: "Failed to fetch ledgers" });
  }
};


exports.getCustomerSuggestions= async (req,res)=>{
  try{
      const query=req.query.query
      // console.log(query)
      // if(!query) return res.status(400).json([])

        const customers= await Customer.find({
           name: { $regex: query, $options: "i" },
        })
        .limit(10)
      .select("name _id"); // only name and ID

    res.json(customers);
  }
  catch(err){

  }
}


exports.getCustomer=async(req,res)=>{
  try{

    const customer= await Customer.findById(req.params.id)
    if (!customer) return res.status(404).json({ message: "Customer not found" });
  
     res.json(customer);
  }
  catch(err){
    console.error(err)
    res.status(500).json({ message: "Server error" });
  }
}







//             get   single customer ledger
exports.getCustomerLedger = async (req, res) => {
  try {
    const { customerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ success: false, message: "Invalid customer ID" });
    }

    const objectId = new mongoose.Types.ObjectId(customerId);

    // fetch ledger entries from Ledger collection (sorted)
    const entries = await Ledger.find({ customerId: objectId }).sort({ date: 1, createdAt: 1 }).lean();

    // format if needed (here entries already have debit/credit/balance)
    res.json({ success: true, ledger: entries });
  } catch (err) {
    console.error("❌ Ledger error:", err);
    res.status(500).json({ success: false, message: "Ledger fetch failed" });
  }
};
