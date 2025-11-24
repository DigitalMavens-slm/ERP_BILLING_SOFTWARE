const Product = require("../Model/ProductFormModel");
const Inventory=require("../Model/InventoryModel")

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find()
      .populate("brandId", "name")
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");
    res.json(data);
    // console.log(data)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const data = new Product(req.body);
    const savedProduct=await data.save();
       await Inventory.create({
      productId: savedProduct._id,
      qty: 0,
      minQty: savedProduct.minOrderQty || 10
    });

    res.json({
      message: "Product added + inventory created",
      product: savedProduct
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
