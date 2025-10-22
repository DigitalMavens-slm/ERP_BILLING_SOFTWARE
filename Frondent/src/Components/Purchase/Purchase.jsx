
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSuggestions } from "../../Context/SuggestionContext";
import "./Purchase.css";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    supplierName: "",
    product: "",
    quantity: 1,
    price: 0,
  });

  const { suggestions, updateSuggestions } = useSuggestions();

  const fetchPurchases = async () => {
    try {
      const res = await Axios.get("http://localhost:4000/api/purchases");
      setPurchases(res.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setNewPurchase((prev) => ({ ...prev, [name]: value }));

    if (["supplierName", "product"].includes(name) && value.trim()) {
      try {
        const res = await Axios.get(
          `http://localhost:4000/api/purchases/searchField?field=${name}&query=${value}`
        );
        updateSuggestions(name, res.data);
      } catch (err) {
        console.error("Suggestion fetch error:", err);
      }
    } else {
      updateSuggestions(name, []);
    }
  };

  const selectSuggestion = (field, value) => {
    setNewPurchase((prev) => ({ ...prev, [field]: value }));
    updateSuggestions(field, []);
  };

  const addPurchase = async () => {
    try {
      await Axios.post("http://localhost:4000/api/purchases", newPurchase);
      setNewPurchase({ supplierName: "", product: "", quantity: 1, price: 0 });
      fetchPurchases();
    } catch (error) {
      console.error("Add purchase error:", error);
    }
  };

  const deletePurchase = async (id) => {
    try {
      await Axios.delete(`http://localhost:4000/api/purchases/${id}`);
      fetchPurchases();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Purchase Orders</h1>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            name="supplierName"
            placeholder="Supplier Name"
            value={newPurchase.supplierName}
            onChange={handleChange}
            autoComplete="off"
          />
          {suggestions.supplierName?.length > 0 && (
            <ul className="suggestions">
              {suggestions.supplierName.map((s, i) => (
                <li key={i} onClick={() => selectSuggestion("supplierName", s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-wrapper">
          <input
            name="product"
            placeholder="Product"
            value={newPurchase.product}
            onChange={handleChange}
            autoComplete="off"
          />
          {suggestions.product?.length > 0 && (
            <ul className="suggestions">
              {suggestions.product.map((p, i) => (
                <li key={i} onClick={() => selectSuggestion("product", p)}>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newPurchase.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newPurchase.price}
          onChange={handleChange}
        />

        <button onClick={addPurchase}>Add Purchase</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase._id}>
              <td>{purchase.supplierName}</td>
              <td>{purchase.product}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.price}</td>
              <td>
                <button onClick={() => deletePurchase(purchase._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchase;
