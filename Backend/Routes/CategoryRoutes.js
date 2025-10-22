const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/CategoryController");

router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.createCategory);
router.delete("/categories/:id",categoryController.deleteCategory)

module.exports = router;
