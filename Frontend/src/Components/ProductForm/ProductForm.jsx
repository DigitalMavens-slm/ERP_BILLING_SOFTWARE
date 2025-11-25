// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAppLocation } from "../../Context/LocationContext";
// const API_URL=import.meta.env.VITE_API_URL
// console.log(API_URL)
// export default function ProductForm() {
//   const {location,Goback} = useAppLocation();
//   // console.log(location)

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   // const [products, setProducts] = useState([]);

//   const [productData, setProductData] = useState({
//     name: "",
//     categoryId: "",
//     subCategoryId: "",
//     brandId: "",
//     mrp: "",
//     purchaseRate: "",
//     saleRate: "",
//     gst: "",
//     barcode: "",
//     unit: "",
//     commission: "",
//     minOrderQty: "",
//   });
//   console.log(productData)

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch dropdown data
//   const fetchAllData = async () => {
//     try {
//       const [catRes,subRes, brandRes,prodRes] = await Promise.all([
//         axios.get(`${API_URL}/api/categories`),
//         axios.get(`${API_URL}/api/subcategories`),
//         axios.get(`${API_URL}/api/brands`),
//         // axios.get(`${API_URL}/api/products`),
//       ]);
//       setCategories(catRes.data);
//       console.log()
//       setSubCategories(subRes.data);
//       setBrands(brandRes.data);
//       // setProducts(prodRes.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   // Add product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!productData.name.trim()) return;

//     setLoading(true);
//     try {
//       await axios.post(`${API_URL}/api/products`, productData);
//       setMessage("Product added successfully!");
//       setProductData({
//         name: "",
//         categoryId: "",
//         subCategoryId: "",
//         brandId: "",
//         mrp: "",
//         purchaseRate: "",
//         saleRate: "",
//         gst: "",
//         barcode: "",
//         unit: "",
//         commission: "",
//         minOrderQty: "",
//       });
//       fetchAllData();
//     } catch (err) {
//       console.error(err);
//       setMessage("Error adding product");
//     } finally {
//       setLoading(false);
//     }
//   };


//   // Delete product
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/api/products/${id}`);
//       fetchAllData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       {location.pathname === "/setting/product" && (
//         <div className="product-form-wrap">
//           <button onClick={Goback}>back</button>
//           <h2>Product Management</h2>

//           <form onSubmit={handleSubmit} className="product-form">

//             <input name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required/>

//             <select name="categoryId" value={productData.categoryId} onChange={handleChange} required>
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <select name="subCategoryId" value={productData.subCategoryId} onChange={handleChange}>
//               <option value="">Select Sub-Category</option>
//               {subCategories
//                 .filter((s) => s.categoryId.toString() === productData.categoryId)
//                 .map((s) => (
//                   <option key={s._id} value={s._id}>
//                     {s.name}
//                   </option>
//                 ))}
//             </select>

//             <select name="brandId" value={productData.brandId} onChange={handleChange}>
//               <option value="">Select Brand</option>
//               {brands.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>

//             <input name="mrp" type="number" value={productData.mrp} onChange={handleChange} placeholder="MRP"/>
//             <input  name="purchaseRate" type="number" value={productData.purchaseRate} onChange={handleChange} placeholder="Purchase Rate"/>
//             <input name="saleRate" type="number" value={productData.saleRate} onChange={handleChange} placeholder="Sale Rate"/>
//             <input name="gst" type="number" value={productData.gst} onChange={handleChange} placeholder="GST %"/>
//             <input name="barcode" value={productData.barcode} onChange={handleChange} placeholder="Barcode"/>
//             <input  name="unit"  value={productData.unit} onChange={handleChange} placeholder="Unit (e.g. pcs, box)"/>
//             <input name="commission" type="number" value={productData.commission} onChange={handleChange} placeholder="Commission %"/>
//             <input name="minOrderQty" type="number" value={productData.minOrderQty} onChange={handleChange} placeholder="Min Order Quantity"/>

//             <button type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Add Product"}
//             </button>
//           </form>

//           {message && <div>{message}</div>}

//           <ul>
//             {/* {products.map((p) => (
//               <li key={p._id}>
//                 {p.name} — ₹{p.saleRate}  
//                 ({brands.find((b) => b._id === p.brandId)?.name || "No Brand"})
//                 <button onClick={() => handleDelete(p._id)}>Delete</button>
//               </li>
//             ))} */}
//           </ul>
//         </div>
//        )} 
//     </>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppLocation } from "../../Context/LocationContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductForm() {
  const { location, Goback } = useAppLocation();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch All Dropdown Data
  const fetchAllData = async () => {
    try {
      const [catRes, subRes, brandRes] = await Promise.all([
        axios.get(`${API_URL}/api/categories`),
        axios.get(`${API_URL}/api/subcategories`),
        axios.get(`${API_URL}/api/brands`),
      ]);

      setCategories(catRes.data);
      setSubCategories(subRes.data);
      setBrands(brandRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Submit Product
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

  return (
    <>
      {location.pathname === "/setting/product" && (
        <div className="max-w-5xl mx-auto bg-white p-6 mt-4 shadow-lg rounded-xl">

          {/* Back Button */}
          <button
            onClick={Goback}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            ⬅ Back
          </button>

          <h2 className="text-3xl font-semibold mb-6">Product Management</h2>

          {/* Product Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Category */}
            <select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              required
              className="border p-3 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Sub Category */}
            <select
              name="subCategoryId"
              value={productData.subCategoryId}
              onChange={handleChange}
              className="border p-3 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Sub-Category</option>
              {subCategories
                .filter((s) => s.categoryId === productData.categoryId)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </select>

            {/* Brand */}
            <select
              name="brandId"
              value={productData.brandId}
              onChange={handleChange}
              className="border p-3 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>

            <input
              name="mrp"
              type="number"
              value={productData.mrp}
              onChange={handleChange}
              placeholder="MRP"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="purchaseRate"
              type="number"
              value={productData.purchaseRate}
              onChange={handleChange}
              placeholder="Purchase Rate"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="saleRate"
              type="number"
              value={productData.saleRate}
              onChange={handleChange}
              placeholder="Sale Rate"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="gst"
              type="number"
              value={productData.gst}
              onChange={handleChange}
              placeholder="GST %"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="barcode"
              value={productData.barcode}
              onChange={handleChange}
              placeholder="Barcode"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="unit"
              value={productData.unit}
              onChange={handleChange}
              placeholder="Unit (e.g. pcs, box)"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="commission"
              type="number"
              value={productData.commission}
              onChange={handleChange}
              placeholder="Commission %"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="minOrderQty"
              type="number"
              value={productData.minOrderQty}
              onChange={handleChange}
              placeholder="Min Order Quantity"
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Add Product"}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              {message}
            </div>
          )}
        </div>
      )}
    </>
  );
}

