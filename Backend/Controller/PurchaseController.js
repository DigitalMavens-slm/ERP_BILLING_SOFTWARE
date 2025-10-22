
const Purchase = require("../Model/PurchaseModel");
const APIFeatures = require("../Utills/Apifeatures");

// ✅ Get all purchases
exports.getPurchases = async (req, res) => {
  try {
    const apiFeatures = new APIFeatures(Purchase.find(), req.query).search().paginate(10);
    const purchases = await apiFeatures.query;
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add new purchase
exports.addPurchase = async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete purchase
exports.deletePurchase = async (req, res) => {
  try {
    const deleted = await Purchase.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.searchField = async (req, res) => {
  try {
    const { field, query } = req.query;
    console.log(req.query);
    

    if (!field || !query) return res.json([]);

    // Only allow certain fields
    const allowedFields = ["supplierName", "product"];
    if (!allowedFields.includes(field))
      return res.status(400).json({ message: "Invalid field" });

    // Build regex search
    const results = await Purchase.find({
      [field]: { $regex: query, $options: "i" },
    })
      .limit(10)
      // .select(field);

    // Return unique suggestions only
    const unique = [...new Set(results.map((r) => r[field]))];
    res.json(unique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
