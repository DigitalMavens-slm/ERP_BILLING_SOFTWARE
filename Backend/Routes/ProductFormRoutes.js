const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/ProductFormController");
// const Category=require("../Controller/CategoryController");
// const SubCategory=require("../Controller/SubCategoryController");
// const Brand=require("../Controller/BrandController")


// router.get("/subcategories",SubCategory.getSubCategories)
// router.get("/categories",Category.getCategories)
// router.get("/brands",Brand.getBrands)
router.get("/products", ProductController.getProducts);
router.post("/products", ProductController.createProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
