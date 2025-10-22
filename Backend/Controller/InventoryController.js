const Inventory = require("../Model/InventoryModel");

// GET all inventory items
exports.getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ lastUpdated: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD new item
exports.addItem = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE item by ID
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// (Optional) UPDATE item by ID
exports.updateItem = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
