import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppLocation } from "../../Context/LocationContext";
const API_URL=import.meta.env.VITE_API_URL
console.log(API_URL)
export default function ProductForm() {
  const {location,Goback} = useAppLocation();
  // console.log(location)

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  // const [products, setProducts] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    mrp: "",
    purchaseRate: "",
    saleRate: "",
    gst: "",
    barcode: "",
    unit: "",
    commission: "",
    minOrderQty: "",
  });
  console.log(productData)

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch dropdown data
  const fetchAllData = async () => {
    try {
      const [catRes,subRes, brandRes,prodRes] = await Promise.all([
        axios.get(`${API_URL}/api/categories`),
        axios.get(`${API_URL}/api/subcategories`),
        axios.get(`${API_URL}/api/brands`),
        // axios.get(`${API_URL}/api/products`),
      ]);
      setCategories(catRes.data);
      console.log()
      setSubCategories(subRes.data);
      setBrands(brandRes.data);
      // setProducts(prodRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.name.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/products`, productData);
      setMessage("Product added successfully!");
      setProductData({
        name: "",
        categoryId: "",
        subCategoryId: "",
        brandId: "",
        mrp: "",
        purchaseRate: "",
        saleRate: "",
        gst: "",
        barcode: "",
        unit: "",
        commission: "",
        minOrderQty: "",
      });
      fetchAllData();
    } catch (err) {
      console.error(err);
      setMessage("Error adding product");
    } finally {
      setLoading(false);
    }
  };


  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {location.pathname === "/setting/product" && (
        <div className="product-form-wrap">
          <button onClick={Goback}>back</button>
          <h2>Product Management</h2>

          <form onSubmit={handleSubmit} className="product-form">

            <input name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required/>

            <select name="categoryId" value={productData.categoryId} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select name="subCategoryId" value={productData.subCategoryId} onChange={handleChange}>
              <option value="">Select Sub-Category</option>
              {subCategories
                .filter((s) => s.categoryId.toString() === productData.categoryId)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </select>

            <select name="brandId" value={productData.brandId} onChange={handleChange}>
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>

            <input name="mrp" type="number" value={productData.mrp} onChange={handleChange} placeholder="MRP"/>
            <input  name="purchaseRate" type="number" value={productData.purchaseRate} onChange={handleChange} placeholder="Purchase Rate"/>
            <input name="saleRate" type="number" value={productData.saleRate} onChange={handleChange} placeholder="Sale Rate"/>
            <input name="gst" type="number" value={productData.gst} onChange={handleChange} placeholder="GST %"/>
            <input name="barcode" value={productData.barcode} onChange={handleChange} placeholder="Barcode"/>
            <input  name="unit"  value={productData.unit} onChange={handleChange} placeholder="Unit (e.g. pcs, box)"/>
            <input name="commission" type="number" value={productData.commission} onChange={handleChange} placeholder="Commission %"/>
            <input name="minOrderQty" type="number" value={productData.minOrderQty} onChange={handleChange} placeholder="Min Order Quantity"/>

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Product"}
            </button>
          </form>

          {message && <div>{message}</div>}

          <ul>
            {/* {products.map((p) => (
              <li key={p._id}>
                {p.name} — ₹{p.saleRate}  
                ({brands.find((b) => b._id === p.brandId)?.name || "No Brand"})
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </li>
            ))} */}
          </ul>
        </div>
       )} 
    </>
  );
}
