const Sales = require("../Model/SalesModel");
const Purchase = require("../Model/PurchaseModel");
const Inventory = require("../Model/InventoryModel");
const Finance = require("../Model/FinanceModel");

// 🧾 SALES SUMMARY
exports.getSalesSummary = async (req, res) => {
  try {
    const sales = await Sales.find();
    const totalSales = sales.reduce((sum, s) => sum + s.price * s.quantity, 0);
    const totalOrders = sales.length;
    res.json({ totalSales, totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧾 PURCHASE SUMMARY
exports.getPurchaseSummary = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    const totalPurchase = purchases.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
    const totalOrders = purchases.length;
    res.json({ totalPurchase, totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧾 INVENTORY SUMMARY
exports.getInventorySummary = async (req, res) => {
  try {
    const items = await Inventory.find();
    const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
    const lowStock = items.filter(
      (item) => item.quantity <= item.minStock
    ).length;
    res.json({ totalStock, lowStock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧾 FINANCE SUMMARY
exports.getFinanceSummary = async (req, res) => {
  try {
    const records = await Finance.find();

    const totalRevenue = records
      .filter((r) => r.type === "Invoice" || r.type === "Payment")
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpenses = records
      .filter((r) => r.type === "Expense")
      .reduce((sum, r) => sum + r.amount, 0);

    const netProfit = totalRevenue - totalExpenses;

    res.json({ totalRevenue, totalExpenses, netProfit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
