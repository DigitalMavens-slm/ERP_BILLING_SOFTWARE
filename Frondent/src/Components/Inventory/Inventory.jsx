// Inventory.js
import React, { useEffect, useState } from "react";
import Axios from "axios";
// import "./Inventory.css";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    productName: "",
    sku: "",
    quantity: 0,
    minStock: 0,
    unitPrice: 0
  });

  const fetchInventory = async () => {
    const res = await Axios.get("http://localhost:4000/api/inventory");
    setItems(res.data);
    checkStockAlert(res.data);
  };

  const checkStockAlert = (inventory) => {
    const lowStockItems = inventory.filter((item) => item.quantity<=item.minStock);

    if (lowStockItems.length > 0) {
      const names = lowStockItems.map((i) => i.productName).join(", ");
      alert(`Low Stock Alert: ${names} — Please restock soon!`);
    }
  };


  useEffect(() => {
    fetchInventory();
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
    
  };

  const addItem = async () => {
    await Axios.post("http://localhost:4000/api/inventory", newItem);
    setNewItem({ productName: "", sku: "", quantity: 0, minStock: 0, unitPrice: 0 });
    fetchInventory();
  };

  const deleteItem = async (id) => {
    await Axios.delete(`http://localhost:4000/api/inventory/${id}`);
    fetchInventory();
  };

   
 function Stockalert(){
   if(newItem.minStock>=10){
     alert(`${newItem.productName} is minimum stock shoul be less than 20`)
  }
 }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory / Stock</h1>

      <div>
        <input name="productName" placeholder="Product Name" value={newItem.productName} onChange={handleChange} />
        <input name="sku" placeholder="SKU" value={newItem.sku} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity" value={newItem.quantity} onChange={handleChange} />
        <input type="number" name="minStock" placeholder="Min Stock" value={newItem.minStock} onChange={handleChange} />
        <input type="number" name="unitPrice" placeholder="Unit Price" value={newItem.unitPrice} onChange={handleChange} />
        <button onClick={addItem}>Add Product</button>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Min Stock</th>
            <th>Unit Price</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}  style={{
                backgroundColor:
                  item.quantity <= item.minStock ? "#fff3cd" : "white", // yellow highlight if low
              }}>
              <td>{item.productName}</td>
              <td>{item.sku}</td>
              <td>{item.quantity}</td>
              <td>{item.minStock}</td>
              <td>{item.unitPrice}</td>
              <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
