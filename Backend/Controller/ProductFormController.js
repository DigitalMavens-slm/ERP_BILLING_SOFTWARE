const Product = require("../Model/ProductFormModel");

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
    await data.save();
    res.json(data);
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
