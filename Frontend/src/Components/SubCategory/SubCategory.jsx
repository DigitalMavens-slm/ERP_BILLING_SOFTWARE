import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppLocation } from "../../Context/LocationContext";
const API_URL=import.meta.env.VITE_API_URL

export default function SubCategoryForm() {
  const {location,Goback} = useAppLocation();

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // 🔹 Fetch all subcategories
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/subcategories`);
      setSubCategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // 🔹 POST subcategory
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subCategoryName.trim() || !selectedCategory) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/subcategories`, {
        name: subCategoryName,
        categoryId: selectedCategory,
      });
      setMessage("Sub-category added successfully!");
      setSubCategoryName("");
      setSelectedCategory("");
      fetchSubCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error adding sub-category");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE subcategory
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/subcategories/${id}`);
      fetchSubCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {location.pathname === "/setting/subcategory" && (
        
        <div className="subcategory-form-wrap">
                    
                    <button onClick={Goback}>back</button>
          <h2>Sub-Category Management</h2>

          <form onSubmit={handleSubmit}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter sub-category name"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Sub-Category"}
            </button>
          </form>

          {message && <div>{message}</div>}

          <ul>
            {subCategories.map((s) => (
              <li key={s._id}>
                {s.name} —{" "}
                <span>
                  (
                  {categories.find((c) => c._id === s.categoryId)?.name ||
                    "No Category"}
                  )
                </span>{" "}
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
