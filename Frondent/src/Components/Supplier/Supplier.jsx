// Supplier.js
import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { ExportExcel } from "../../Utills/ExportExcel";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const fetchSuppliers = async () => {
    const res = await Axios.get("http://localhost:4000/suppliers");
    setSuppliers(res.data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const addSupplier = async () => {
    await Axios.post("http://localhost:4000/suppliers", newSupplier);
    setNewSupplier({ name: "", email: "", phone: "", address: "" });
    fetchSuppliers();
  };

  const deleteSupplier = async (id) => {
    await Axios.delete(`http://localhost:4000/suppliers/${id}`);
    fetchSuppliers();
  };

  return (
    <>
    <div style={{ padding: "20px" }}>
      <h1>Suppliers</h1>

      <div>
        <input name="name" placeholder="Name" value={newSupplier.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={newSupplier.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={newSupplier.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={newSupplier.address} onChange={handleChange} />
        <button onClick={addSupplier}>Add Supplier</button>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.address}</td>
              <td>
                <button onClick={() => deleteSupplier(supplier._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   {/* <button onclick={()=>ExportExcel("Customer")}>Export</button> */}

</>
  );
};

export default Supplier;
