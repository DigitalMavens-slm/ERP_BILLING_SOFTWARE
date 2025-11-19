
// const mongoose = require("mongoose");
// const Purchase = require("../Model/PurchaseModel");
// const Supplier=require("../Model/SupplierModel")
// const Ledger = require("../Model/LedgerModel"); // Supplier ledger use pannum
// const APIFeatures = require("../Utills/Apifeatures");

// // ✅ Get all purchases with search/filter/pagination
// const getAllPurchases = async (req, res) => {
//   try {
//     const resPerPage = 10;
//     const apiFeatures = new APIFeatures(Purchase.find(), req.query)
//       .search()
//       .filter()
//       .paginate(resPerPage);

//     const purchases = await apiFeatures.query;

//     res.status(200).json({
//       success: true,
//       count: purchases.length,
//       purchases,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching purchases:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Search Purchase (by bill no, supplier name, phone)
// const searchPurchase = async (req, res) => {
//   try {
//     const query = req.query.query?.trim();
//     if (!query) return res.status(400).json({ message: "Query required" });

//     const purchases = await Supplier.find({
//       $or: [
//         // { billNum: { $regex: query, $options: "i" } },
//         { name: { $regex: query, $options: "i" } },
//         // { supplierPhone: { $regex: query, $options: "i" } },
//       ],
//     }).limit(10);

//     if (!purchases || purchases.length === 0) {
//       return res.status(404).json({ message: "No purchase found" });
//     }

//     res.status(200).json({ success: true, purchases });
//   } catch (err) {
//     console.error("❌ Error searching purchases:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Create Purchase
// const createPurchase = async (req, res) => {
//   try {
//     const purchaseData = req.body;

//     // Ensure supplierId is ObjectId
//     if (purchaseData.supplierId) {
//       purchaseData.supplierId = new mongoose.Types.ObjectId(
//         purchaseData.supplierId
//       );
//     }

//     const newPurchase = new Purchase(purchaseData);
//     await newPurchase.save();

//     // --- Create ledger entry for this supplier ---
//     // Get last ledger entry for this supplier to compute running balance
//     const lastLedger = await Ledger.findOne({
//       supplierId: newPurchase.supplierId,
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     const prevBalance = lastLedger ? lastLedger.balance : 0;

//     const credit = Number(newPurchase.subtotal || 0); // purchase → supplier gets credited
//     const debit = 0;
//     const newBalance = prevBalance - debit + credit;

//     await Ledger.create({
//       supplierId: newPurchase.supplierId,
//       date: newPurchase.createdAt || new Date(),
//       particulars: "Purchase Created",
//       billNo: newPurchase.billNum,
//       debit,
//       credit,
//       balance: newBalance,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Purchase saved successfully",
//       data: newPurchase,
//     });
//   } catch (error) {
//     console.error("❌ Error saving purchase:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to save purchase",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get Single Purchase
// const getPurchaseById = async (req, res) => {
//   try {
//     const purchase = await Purchase.findById(req.params.id);
//     if (!purchase)
//       return res
//         .status(404)
//         .json({ success: false, message: "Purchase not found" });

//     res.json({ success: true, data: purchase });
//   } catch (error) {
//     console.error("❌ Error fetching purchase:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch purchase",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   getAllPurchases,
//   searchPurchase,
//   createPurchase,
//   getPurchaseById,
// };


// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();

// const Purchase = require("../Model/PurchaseModel");
// const Ledger = require("../Model/LedgerModel");
// const APIFeatures = require("../Utills/Apifeatures");

// // ✅ Get all purchases with search/filter/pagination
// const getAllPurchases = async (req, res, next) => {
//   try {
//     const resPerPage = 10;
//     const apiFeatures = new APIFeatures(Purchase.find(), req.query)
//       .search()
//       .filter()
//       .paginate(resPerPage);

//     const purchases = await apiFeatures.query;

//     res.status(200).json({
//       success: true,
//       count: purchases.length,
//       purchases,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Search Purchase by number / supplier name / supplier phone
// const searchPurchase = async (req, res) => {
//   try {
//     const query = req.query.query?.trim();
//     if (!query) return res.status(400).json({ message: "Query required" });

//     const purchases = await Purchase.find({
//       $or: [
//         { purchaseNum: { $regex: query, $options: "i" } },
//         { supplierName: { $regex: query, $options: "i" } },
//         { supplierPhone: { $regex: query, $options: "i" } },
//       ],
//     }).limit(10);

//     if (!purchases || purchases.length === 0) {
//       return res.status(404).json({ message: "No purchase found" });
//     }

//     res.status(200).json({ success: true, purchases });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Create New Purchase + Ledger Entry
// const createPurchase = async (req, res) => {
//   try {
//     const purchaseData = req.body;

//     // Ensure supplierId is ObjectId
//     if (purchaseData.supplierId) {
//       purchaseData.supplierId = new mongoose.Types.ObjectId(purchaseData.supplierId);
//     }

//     const newPurchase = new Purchase(purchaseData);
//     await newPurchase.save();

//     // --- Create ledger entry for this supplier ---
//     const lastLedger = await Ledger.findOne({ supplierId: newPurchase.supplierId })
//       .sort({ createdAt: -1 })
//       .lean();

//     const prevBalance = lastLedger ? lastLedger.balance : 0;

//     const credit = Number(newPurchase.subtotal || 0); // purchase increases credit (we owe supplier)
//     const debit = 0;
//     const newBalance = prevBalance + credit - debit;

//     await Ledger.create({
//       supplierId: newPurchase.supplierId,
//       date: newPurchase.createdAt || new Date(),
//       particulars: "Purchase Generated",
//       purchaseNo: newPurchase.purchaseNum,
//       debit,
//       credit,
//       balance: newBalance,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Purchase saved successfully",
//       data: newPurchase,
//     });
//   } catch (error) {
//     console.error("❌ Error saving purchase:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to save purchase",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get Single Purchase
// const getPurchaseById = async (req, res) => {
//   try {
//     const purchase = await Purchase.findById(req.params.id);
//     if (!purchase)
//       return res.status(404).json({ success: false, message: "Purchase not found" });

//     res.json({ success: true, data: purchase });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch purchase",
//       error: error.message,
//     });
//   }
// };

// // ✅ Send Purchase Copy as PDF (if needed)
// const fs = require("fs");
// const { generatePurchasePDF } = require("../Utills/PdfGenerator");
// const { sendMailWithAttachment } = require("../MailSender/MailSender");

// async function sendPurchase(req, res) {
//   try {
//     const { supplierEmail, purchase } = req.body;

//     if (!supplierEmail || !purchase) {
//       return res.status(400).json({ error: "Missing email or purchase data" });
//     }

//     // 🧾 Generate PDF
//     const pdfPath = await generatePurchasePDF(purchase);

//     // ✉️ Send Mail with attachment
//     await sendMailWithAttachment(
//       supplierEmail,
//       `Purchase ${purchase.purchaseNum}`,
//       `Dear ${purchase.supplierName},\n\nPlease find attached your purchase order.\n\nThank you.`,
//       pdfPath
//     );

//     // 🧹 Delete after sending
//     fs.unlinkSync(pdfPath);

//     res.json({ success: true, message: "Purchase sent successfully!" });
//   } catch (err) {
//     console.error("❌ Error sending purchase:", err);
//     res.status(500).json({ error: "Failed to send purchase" });
//   }
// }

// module.exports = {
//   createPurchase,
//   getAllPurchases,
//   getPurchaseById,
//   sendPurchase,
//   searchPurchase,
// };






const mongoose = require("mongoose");
const Purchase = require("../Model/PurchaseModel");
const Ledger = require("../Model/LedgerModel");
const APIFeatures = require("../Utills/Apifeatures");
const fs = require("fs");
const { generatePurchasePDF } = require("../Utills/PdfGenerator");
const { sendMailWithAttachment } = require("../MailSender/MailSender");

// ✅ Get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const resPerPage = 10;
    const apiFeatures = new APIFeatures(Purchase.find(), req.query)
      .search()
      .filter()
      .paginate(resPerPage);

    const purchases = await apiFeatures.query;
    res.status(200).json({
      success: true,
      count: purchases.length,
      purchases,
    });
  } catch (err) {
    console.error("❌ Error fetching purchases:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Search purchases for suggestions
// const searchPurchase = async (req, res) => {
//   try {
//     const query = req.query.query?.trim();
//     if (!query) return res.status(400).json({ message: "Query required" });

//     const purchases = await Supplier.find({
//       $or: [
//         { purchaseNum: { $regex: query, $options: "i" } },
//         { name: { $regex: query, $options: "i" } },
//         { supplierPhone: { $regex: query, $options: "i" } },
//       ],
//     }).limit(10);

//     if (!purchases.length) {
//       return res.status(404).json({ message: "No purchase found" });
//     }

//     res.status(200).json({ success: true, purchases });
//   } catch (err) {
//     console.error("❌ Error searching purchases:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


const searchPurchase = async (req, res) => {
  try {
    const query = req.query.query?.trim();
    // console.log(query)
    if (!query) return res.status(400).json({ message: "Query required" });

    const purchases = await Purchase.find({
      $or: [
        { billNum: { $regex: query, $options: "i" } },       // ✅ matches schema
        { supplierName: { $regex: query, $options: "i" } },  // ✅ matches schema
      ],
    }).limit(10);
console.log(purchases)
    if (!purchases || purchases.length === 0) {
      return res.status(404).json({ message: "No purchase found" });
    }

    res.status(200).json({ success: true, purchases });
  } catch (err) {
    console.error("❌ Error searching purchases:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message,stack:err.stack });
  }
};




// ✅ Create purchase
const createPurchase = async (req, res) => {
  try {
    const purchaseData = req.body;

    if (purchaseData.supplierId) {
      purchaseData.supplierId = new mongoose.Types.ObjectId(purchaseData.supplierId);
    }

    const newPurchase = new Purchase(purchaseData);
    await newPurchase.save();

    // Add ledger entry
    const lastLedger = await Ledger.findOne({ supplierId: newPurchase.supplierId })
      .sort({ createdAt: -1 })
      .lean();

    const prevBalance = lastLedger ? lastLedger.balance : 0;
    const credit = Number(newPurchase.subtotal || 0);
    const newBalance = prevBalance + credit;

    await Ledger.create({
      supplierId: newPurchase.supplierId,
      date: new Date(),
      particulars: "Purchase Generated",
      purchaseNo: newPurchase.purchaseNum,
      debit: 0,
      credit,
      balance: newBalance,
    });

    res.status(201).json({
      success: true,
      message: "Purchase saved successfully",
      data: newPurchase,
    });
  } catch (error) {
    console.error("❌ Error saving purchase:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save purchase",
      error: error.message,
    });
  }
};

// ✅ Get purchase by ID
const getPurchaseById = async (req, res) => {
  try {
    console.log(req.params.id)
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase)
      return res.status(404).json({ success: false, message: "Purchase not found" });

    res.json({ success: true, data: purchase });
    console.log(purchase)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchase",
      error: error.message,
    });
  }
};

// ✅ Send purchase PDF/email
const sendPurchase = async (req, res) => {
  try {
    const { supplierEmail, purchase } = req.body;

    if (!supplierEmail || !purchase) {
      return res.status(400).json({ error: "Missing email or purchase data" });
    }

    const pdfPath = await generatePurchasePDF(purchase);

    await sendMailWithAttachment(
      supplierEmail,
      `Purchase ${purchase.purchaseNum}`,
      `Dear ${purchase.supplierName},\n\nPlease find attached your purchase order.\n\nThank you.`,
      pdfPath
    );

    fs.unlinkSync(pdfPath);

    res.json({ success: true, message: "Purchase sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending purchase:", err);
    res.status(500).json({ error: "Failed to send purchase" });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  searchPurchase,
  sendPurchase,
};
