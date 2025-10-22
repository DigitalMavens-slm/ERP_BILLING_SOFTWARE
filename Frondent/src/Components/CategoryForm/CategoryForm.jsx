import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppLocation } from "../../Context/LocationContext";

const API_URL=import.meta.env.VITE_API_URL


export default function CategoryForm() {
  const {location,Goback} = useAppLocation();

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // GET categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // POST category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/categories`, { name: categoryName });
      setMessage("Category added successfully!");
      setCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error adding category");
    } finally {
      setLoading(false);
    }
  };


  // DELETE category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {location.pathname === "/setting/category" && (
        <div className="category-form-wrap">
          <button onClick={Goback}>back</button>
          <h2>Category Management</h2>

          <form onSubmit={handleSubmit}>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Category"}
            </button>
          </form>

          {message && <div>{message}</div>}

          <ul>
            {categories.map((c) => (
              <li key={c._id}>
                {c.name}{" "}
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
