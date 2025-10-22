import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppLocation } from "../Context/LocationContext";
import { ExportExcel } from "../Utills/ExportExcel";
import { ImportExcel } from "../Utills/ImportExcel";
// import {Brand} from "../../../Backend/Model/BrandModel"
const API_URL=import.meta.env.VITE_API_URL



export default function BrandForm() {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 const[file,setFile]=useState(null)
  const {location,Goback}=useAppLocation()

  // GET brands
  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/brands`);
      setBrands(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // POST brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/brands`, { name: brandName });
      setMessage("Brand added successfully!");
      setBrandName("");
      fetchBrands();
    } catch (err) {
      console.error(err);
      setMessage("Error adding brand");
    } finally {
      setLoading(false);
    }
  };

  // DELETE brand
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/brands/${id}`);
      fetchBrands();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    {location.pathname === "/setting/brand" &&
    <div className="brand-form-wrap">

          <button onClick={Goback}>back</button>
      <h2>Brand Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter brand name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Brand" }
        </button>
      </form>

      {message && <div>{message}</div>}

      <ul>
        {brands.map((b) => (
          <li key={b._id}>
            {b.name}{" "}
            <button onClick={() => handleDelete(b._id)}>Delete</button>
          </li>
        ))}
      </ul>


<div style={{ marginTop: "20px" }}>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      await ImportExcel("Brand", file);
      fetchBrands(); 
    }}
  >
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      accept=".xlsx, .xls"
    />
    <button type="submit" disabled={!file}>
      Import Excel
    </button>
  </form>
</div>







{/* <button onClick={() => window.open(`${API_URL}/api/brands/export/excel`)}>Export Excel</button> */}
<button onClick={ () => ExportExcel("Brand") }>Export Excel</button>
{/* <button onClick={()=> ImportExcel("Brand",file) }>Import Excel</button> */}

    </div>
    }</>
  );
}
