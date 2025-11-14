import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function PaymentUpdateUnified() {
  const [type, setType] = useState("Sales"); // "Sales" or "Purchase"
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Cash");
  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
console.log("🧾 Type value at the moment of submit:", type);

  // 🔍 Fetch suggestions dynamically
  const fetchSuggestions = async (value) => {
    setQuery(value);
    console.log(value)
    // if (value.trim().length < 2) return setSuggestions([]);

    try {
      const endpoint =
        type === "Sales"
          ? `${API_URL}/api/invoices/search`
          : `${API_URL}/api/purchases/search`;

      const res = await axios.get(endpoint, { params: { query: value } });
      setSuggestions(
        type === "Sales" ? res.data.invoices : res.data.purchases
      );
      console.log(endpoint)
    } catch (err) {
      console.error("Error fetching:", err);
      setSuggestions([]);
    }
  };

  // ✅ Select result
  const handleSelect = (item) => {
    setSelected(item);
    setSuggestions([]);
    setQuery(type === "Sales" ? item.invoiceNum : item.billNum);
  };


  // // 💳 Submit Payment
  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   if (!selected) return alert("Select an invoice/bill first!");
  //   try {
  //     setLoading(true);
   
  //     if (type === "Sales") {
  //       await axios.post(`${API_URL}/api/payments`, {
  //         invoiceId: selected._id,
  //         customerId: selected.customerId?._id || selected.customerId,
  //         amount: Number(amount),
  //         mode,
  //         txnId,
  //       });
        
  //     }
  //     if(type === "Purchase"){
  //       await axios.post(`${API_URL}/api/purchase-payments`, {
  //         purchaseId: selected._id,
  //         supplierId: selected.supplierId?._id || selected.supplierId,
  //         amount: Number(amount),
  //         mode,
  //         txnId,
  //       });
  //     }

  //     alert("✅ Payment Updated Successfully!");
  //     setAmount("");
  //     setTxnId("");
  //     setSelected(null);
  //     setQuery("");
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Payment Failed!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handlePayment = async (e, currentType = type) => {
  e.preventDefault();

  const isSales = currentType === "Sales";

  console.log("🧾 Type at submit:", currentType);
  console.log("Selected:", selected);

  if (!selected) return alert("Select an invoice or bill first!");

  const endpoint = isSales
    ? `${API_URL}/api/payments`
    : `${API_URL}/api/purchase-payments`;

  const payload = isSales
    ? {
        invoiceId: selected._id,
        customerId: selected.customerId?._id || selected.customerId,
      }
    : {
        purchaseId: selected._id,
        supplierId: selected.supplierId?._id || selected.supplierId,
      };

  try {
    await axios.post(endpoint, {
      ...payload,
      amount: Number(amount),
      mode,
      txnId,
    });
    alert("✅ Payment updated successfully!");
    setSuggestions([])
    setSelected(null)
    setAmount("")
  } catch (err) {
    console.error(err);
    alert("❌ Payment failed!");
  }
};


  return (
    <div className="payment-update-container">
      <h2>💰 Payment Update Center</h2>

      {/* 🔹 Select Type */}
      <div className="form-group">
        <label>Payment Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Sales">Sales Payment</option>
          <option value="Purchase">Purchase Payment</option>
        </select>
      </div>

      {/* 🔹 Search */}
      <div className="form-group">
        <label>{type === "Sales" ? "Invoice / Customer" : "Bill / Supplier"}</label>
        <input
          value={query}
          onChange={(e) => fetchSuggestions(e.target.value)}
          placeholder={`Search ${type === "Sales" ? "Invoice or Customer" : "Bill or Supplier"}`}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item) => (
              <li key={item._id} onClick={() => handleSelect(item)}>
                {type === "Sales"
                  ? `${item.invoiceNum} - ${item.customerName}`
                  : `${item.billNum} - ${item.supplierName}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 Info Card */}
      {selected && (
        <div className="info-card">
          <p><b>{type === "Sales" ? "Customer" : "Supplier"}:</b> {type === "Sales" ? selected.customerName : selected.supplierName}</p>
          <p><b>Phone:</b> {type === "Sales" ? selected.customerPhone : selected.phone}</p>
          <p><b>Amount:</b> ₹{selected.subtotal}</p>
          <p><b>Status:</b> {selected.paymentStatus}</p>
        </div>
      )}

      {/* 🔹 Payment Form */}
      {selected && (
        <form onSubmit={(e)=>handlePayment(e,type)} className="payment-form">
          <label>Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank</option>
            <option>Card</option>
          </select>

          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />

          <label>Txn ID</label>
          <input
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            placeholder="Optional"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "💾 Submit Payment"}
          </button>
        </form>
      )}
    </div>
  );
}
