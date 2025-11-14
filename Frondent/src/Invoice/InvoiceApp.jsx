import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InvoiceApp.css";

import { useNavigate } from "react-router-dom";
import { useSuggestions } from "../Context/SuggestionContext";

const API_URL = import.meta.env.VITE_API_URL;

const InvoiceApp = () => {
  const navigate = useNavigate();
  const { setCustomerId } = useSuggestions();
  const [invoiceNum, setInvoiceNum] = useState("");
  const [date, setDate] = useState("");
  const [invoiceType, setInvoiceType] = useState("Invoice");
  const [customerName, setCustomerName] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
  customerId: "" ,  
  phone: "",
  gstin: "",
  email: "",
  address: "",
});
// console.log(customerDetails);

  const [billType, setBillType] = useState("Cash");
  const [gstType, setGstType] = useState("GST");
  const [amountType, setAmountType] = useState("Excluding Tax");

  const [productsList, setProductsList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [item, setItem] = useState({
    product: "",
    qty: 0,
    mrp: 0,
    rate: 0,
    dis: 0,
    tax: 0,
  });

  const [payment, setPayment] = useState({
  billType: "Cash", // Default
  receivedAmount: 0,
  balanceAmount: 0,
  paymentStatus: "Pending",
  upiId: "",
  bankName: "",
  transactionId: "",
});


  const [items, setItems] = useState([]);

  // 🔹 Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProductsList(res.data);
        // console.log(res.data)
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Fetch Customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/customers`);
        // console.log(res.data)
        setCustomersList(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // 🔹 Auto-generate Invoice No & Date
 useEffect(() => {
  const fetchNextInvoiceNum = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/invoices/next-invoice-num`);
      setInvoiceNum(res.data.nextInvoiceNum);
    } catch (err) {
      console.error("Error fetching invoice number:", err);
      setInvoiceNum("INV0001"); // fallback
    }

    setDate(new Date().toISOString().split("T")[0]);
  };

  fetchNextInvoiceNum();
}, []);


  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer") {
    setCustomerName(value);
    if (value.trim() === "") {
      setFilteredCustomers(customersList);
    } else {
      const filtered = customersList.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
    return;
  }

  if (name === "product") {
    setItem((prev) => ({ ...prev, product: value }));

    if (value.trim() === "") {
      setFilteredProducts(productsList);
    } else {
      const filtered = productsList.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    return;
  }
    setItem((prev) => ({
      ...prev,
      [name]:
        name === "qty" || name === "mrp" || name === "rate" || name === "dis"
          ? Number(value)
          : value,
    }));
  };

  // 🔹 When input clicked — show all products
  const handleProductClick = () => {
    setFilteredProducts(productsList);
    // setFilteredProducts(customersList)
  };


const selectCustomer = (name) => {
  setCustomerName(name);
  const selected = customersList.find((c) => c.name === name);
  if (selected) {
    setCustomerDetails({
      phone: selected.phone,
      gstin: selected.gstin,
      email: selected.email,
      address: selected.billingAddress,
      customerId:selected._id
    });
    console.log(selected._id)
  }
  setFilteredCustomers([]); // hide suggestion list
};


  // 🔹 Select Product → Auto fill MRP, Rate, GST
  const selectProduct = (selectedName) => {
    const selected = productsList.find((p) => p.name === selectedName);
    if (selected) {
      setItem({
        ...item,
        product: selected.name,
        mrp: selected.mrp || 0,
        rate: selected.saleRate || 0,
        tax: selected.gst || 18,
      });
    }
    setFilteredProducts([]);
  };

  // 🔹 Add Item
  const addItem = () => {
    if (!item.product.trim()) return alert("Product Name required!");
    if (item.qty <= 0) return alert("Quantity must be > 0!");
    if (item.rate <= 0) return alert("Rate must be > 0!");

    setItems((prev) => [...prev, item]);
    setItem({ product: "", qty: 0, mrp: 0, rate: 0, dis: 0, tax: 0 });
  };

  // 🔹 Delete Item
  const deleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Tax Logic
  const calculateItemBreakdown = (itm) => {
    const discountAmount = (itm.rate * itm.qty * itm.dis) / 100;
    const gstPercent = Number(itm.tax) || 0;

    let baseAmount = 0;
    let taxAmount = 0;
    let totalAmount = 0;

    if (amountType === "Including Tax") {
      const gross = itm.rate * itm.qty - discountAmount;
      baseAmount = gross / (1 + gstPercent / 100);
      taxAmount = gross - baseAmount;
      totalAmount = gross;
    } else {
      baseAmount = itm.rate * itm.qty - discountAmount;
      taxAmount = (baseAmount * gstPercent) / 100;
      totalAmount = baseAmount + taxAmount;
    }

    return { baseAmount, taxAmount, totalAmount };
  };

  const subtotal = items.reduce((acc, itm) => acc + calculateItemBreakdown(itm).totalAmount,0);

  const quantity = items.reduce((acc, itm) => acc + itm.qty, 0);

   const handleSave = async () => {
    if (items.length === 0) return alert("No items added!");
    if (!customerName.trim()) return alert("Customer Name required!");

    const invoiceData = {
       customerId: customerDetails.customerId,
      invoiceNum,
      date,
      invoiceType,
      customerName,
      billType,
      gstType,
      amountType,
      items,
      subtotal,
      totalQty:quantity,
      // payment
    };

    try {
      // 🔹 Save to DB
     const res= await axios.post(`${API_URL}/api/invoices`, invoiceData);
      setCustomerId(customerDetails.customerId);
        console.log(res)
        console.log(res.data)
      // localStorage.setItem("customerId", customerDetails.customerId); // ✅ Force save
// console.log("Saved customerId:", customerDetails.customerId);
      navigate("/invoice-details", { state: { invoiceData ,customerDetails,} });


    } catch (err) {
      console.error("Error saving invoice:", err);
      alert("Error saving invoice!");
    }
  }

  return (
    <>
      {/* HEADER */}
      <div className="invoice-header-container">
        <div className="invoice-field">
          <label>Invoice No *</label>
          <input value={invoiceNum} readOnly />
        </div>

        <div className="invoice-field">
          <label>Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="invoice-field">
          <label>Invoice Type *</label>
          <select
            value={invoiceType}
            onChange={(e) => setInvoiceType(e.target.value)}
          >
            <option value="Invoice">Invoice</option>
            <option value="Proforma Invoice">Proforma Invoice</option>
          </select>
        </div>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="invoice-row">
        

<div className="invoice-field" style={{ position: "relative" }}>
  <label>Customer Name *</label>
  <input
    placeholder="Enter Customer Name"
    value={customerName}
    autoComplete="off"
    onChange={handleChange}
    name="customer"
  />

  {filteredCustomers.length > 0 && (
    <ul className="suggestion-box">
      {filteredCustomers.map((c) => (
        <li key={c._id} onClick={() => selectCustomer(c.name)}>
          {c.name}
        </li>
      ))}
    </ul>
  )}
</div>


<div className="invoice-field">
  <label>Bill Type *</label>
  <select value={billType}
  onChange={(e) => {setBillType(e.target.value);setPayment((prev) => ({ ...prev, billType: e.target.value }));}}>
  <option value="Cash">Cash</option>
  <option value="Credit">Credit</option>
</select>
</div>

        <div className="invoice-field">
          <label>GST Type *</label>
          <select
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
          >
            <option value="GST">GST</option>
            <option value="IGST">IGST</option>
            <option value="NOTax">No Tax</option>
          </select>
        </div>

        <div className="invoice-field">
          <label>All Amounts Are *</label>
          <select
            value={amountType}
            onChange={(e) => setAmountType(e.target.value)}
          >
            <option value="No Tax">No Tax</option>
            <option value="Including Tax">Including Tax</option>
            <option value="Excluding Tax">Excluding Tax</option>
          </select>
        </div>
      </div>

      {/* ITEM INPUT */}
      <div className="item-input-row" style={{ position: "relative" }}>
        <div className="product-suggest-container">
          <input
            placeholder="Product Name"
            name="product"
            value={item.product}
            onChange={handleChange}
            onClick={handleProductClick}
            autoComplete="off"
          />
          {filteredProducts.length > 0 && (
            <ul className="suggestion-box">
              {filteredProducts.map((p) => (
                <li key={p._id} onClick={() => selectProduct(p.name)}>
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input placeholder="QTY" name="qty" type="number" value={item.qty} onChange={handleChange}/>
        <input placeholder="MRP" name="mrp" type="number" value={item.mrp} onChange={handleChange}/>
        <input placeholder="Rate" name="rate" type="number" value={item.rate} onChange={handleChange}/>
        <input placeholder="DIS %" name="dis" type="number" value={item.dis} onChange={handleChange}/>
        <select name="tax" value={item.tax} onChange={handleChange}>
          <option value="0">0</option>
          <option value="5">5</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="28">28</option>
        </select>
        <button onClick={addItem}>Add</button>
      </div>

      {/* ITEM TABLE */}
      <h3>Items List:</h3>
      <div className="table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>QTY</th>
              <th>MRP</th>
              <th>RATE</th>
              <th>DIS%</th>
              <th>GST%</th>
              <th>TOTAL</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((itm, idx) => (
              <tr key={idx}>
                <td>{itm.product}</td>
                <td>{itm.qty}</td>
                <td>₹{itm.mrp}</td>
                <td>₹{itm.rate}</td>
                <td>{itm.dis}%</td>
                <td>{itm.tax}%</td>
                <td>₹{calculateItemBreakdown(itm).totalAmount.toFixed(2)}</td>
                <td>
                  <button onClick={() => deleteItem(idx)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <div className="invoice-footer">
        <div>Total Qty: {quantity}</div>
        {/* <div>No. of Items: {noOfItems}</div> */}
        <div className="payable">Payable: ₹{subtotal.toFixed(2)}</div>
      </div>

<div style={{ textAlign: "right", marginTop: "20px" }}>
        <button onClick={handleSave} className="save-btn">
          Save & View Invoice
        </button>
      </div>
    </>
  );
};

export default InvoiceApp;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./InvoiceApp.css";
// import { useNavigate } from "react-router-dom";
// import { useSuggestion } from "../Context/KeyBoardContext";

// const API_URL = import.meta.env.VITE_API_URL;

// const InvoiceApp = () => {
//   const navigate = useNavigate();

//   // 🧠 Keyboard Context
//   const {
//     suggestions,
//     setSuggestions,
//     highlightIndex,
//     setHighlightIndex,
//     handleKeyDown,
//     suggestionRefs,
//   } = useSuggestion();

//   const [invoiceNum, setInvoiceNum] = useState("");
//   const [date, setDate] = useState("");
//   const [invoiceType, setInvoiceType] = useState("Invoice");
//   const [customerName, setCustomerName] = useState("");
//   const [customerDetails, setCustomerDetails] = useState({
//     customerId: "",
//     phone: "",
//     gstin: "",
//     email: "",
//     address: "",
//   });

//   const [billType, setBillType] = useState("Cash");
//   const [gstType, setGstType] = useState("GST");
//   const [amountType, setAmountType] = useState("Excluding Tax");

//   const [productsList, setProductsList] = useState([]);
//   const [customersList, setCustomersList] = useState([]);
//   const [item, setItem] = useState({
//     product: "",
//     qty: 0,
//     mrp: 0,
//     rate: 0,
//     dis: 0,
//     tax: 0,
//   });
//   const [items, setItems] = useState([]);

//   // 🔹 Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/products`);
//         setProductsList(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // 🔹 Fetch Customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/customers`);
//         setCustomersList(res.data);
//       } catch (err) {
//         console.error("Error fetching customers:", err);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // 🔹 Auto-generate Invoice No & Date
//   useEffect(() => {
//     const fetchNextInvoiceNum = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/invoices/next-invoice-num`);
//         setInvoiceNum(res.data.nextInvoiceNum);
//       } catch (err) {
//         console.error("Error fetching invoice number:", err);
//         setInvoiceNum("INV0001");
//       }
//       setDate(new Date().toISOString().split("T")[0]);
//     };
//     fetchNextInvoiceNum();
//   }, []);

//   // 🔹 Handle Input Change (Customer + Product integrated)
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "customer") {
//       setCustomerName(value);
//       if (value.trim().length < 2) return setSuggestions([]);
//       const filtered = customersList.filter((c) =>
//         c.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setHighlightIndex(-1);
//       return;
//     }

//     if (name === "product") {
//       setItem((prev) => ({ ...prev, product: value }));
//       if (value.trim().length < 2) return setSuggestions([]);
//       const filtered = productsList.filter((p) =>
//         p.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setHighlightIndex(-1);
//       return;
//     }

//     setItem((prev) => ({
//       ...prev,
//       [name]:
//         name === "qty" || name === "mrp" || name === "rate" || name === "dis"
//           ? Number(value)
//           : value,
//     }));
//   };

//   // 🔹 Select Customer
//   const handleCustomerSelect = (item) => {
//     setCustomerName(item.name);
//     setCustomerDetails({
//       phone: item.phone,
//       gstin: item.gstin,
//       email: item.email,
//       address: item.billingAddress,
//       customerId: item._id,
//     });
//     setHighlightIndex(-1);
//     setSuggestions([]);
//   };

//   // 🔹 Select Product
//   const handleProductSelect = (item) => {
//     setItem({
//       product: item.name,
//       mrp: item.mrp || 0,
//       rate: item.saleRate || 0,
//       tax: item.gst || 18,
//       qty: 0,
//       dis: 0,
//     });
//     setHighlightIndex(-1);
//     setSuggestions([]);
//   };

//   // 🔹 Add Item
//   const addItem = () => {
//     if (!item.product.trim()) return alert("Product Name required!");
//     if (item.qty <= 0) return alert("Quantity must be > 0!");
//     if (item.rate <= 0) return alert("Rate must be > 0!");

//     setItems((prev) => [...prev, item]);
//     setItem({ product: "", qty: 0, mrp: 0, rate: 0, dis: 0, tax: 0 });
//   };

//   // 🔹 Delete Item
//   const deleteItem = (index) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   // 🔹 Tax Logic
//   const calculateItemBreakdown = (itm) => {
//     const discountAmount = (itm.rate * itm.qty * itm.dis) / 100;
//     const gstPercent = Number(itm.tax) || 0;

//     let baseAmount = 0;
//     let taxAmount = 0;
//     let totalAmount = 0;

//     if (amountType === "Including Tax") {
//       const gross = itm.rate * itm.qty - discountAmount;
//       baseAmount = gross / (1 + gstPercent / 100);
//       taxAmount = gross - baseAmount;
//       totalAmount = gross;
//     } else {
//       baseAmount = itm.rate * itm.qty - discountAmount;
//       taxAmount = (baseAmount * gstPercent) / 100;
//       totalAmount = baseAmount + taxAmount;
//     }

//     return { baseAmount, taxAmount, totalAmount };
//   };

//   const subtotal = items.reduce(
//     (acc, itm) => acc + calculateItemBreakdown(itm).totalAmount,
//     0
//   );
//   const quantity = items.reduce((acc, itm) => acc + itm.qty, 0);

//   // 🔹 Save Invoice
//   const handleSave = async () => {
//     if (items.length === 0) return alert("No items added!");
//     if (!customerName.trim()) return alert("Customer Name required!");

//     const invoiceData = {
//       customerId: customerDetails.customerId,
//       invoiceNum,
//       date,
//       invoiceType,
//       customerName,
//       billType,
//       gstType,
//       amountType,
//       items,
//       subtotal,
//       totalQty: quantity,
//     };

//     try {
//       await axios.post(`${API_URL}/api/invoices`, invoiceData);
//       localStorage.setItem("customerId", customerDetails.customerId);
//       navigate("/invoice-details", {
//         state: { invoiceData, customerDetails },
//       });
//     } catch (err) {
//       console.error("Error saving invoice:", err);
//       alert("Error saving invoice!");
//     }
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <div className="invoice-header-container">
//         <div className="invoice-field">
//           <label>Invoice No *</label>
//           <input value={invoiceNum} readOnly />
//         </div>

//         <div className="invoice-field">
//           <label>Date *</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         <div className="invoice-field">
//           <label>Invoice Type *</label>
//           <select
//             value={invoiceType}
//             onChange={(e) => setInvoiceType(e.target.value)}
//           >
//             <option value="Invoice">Invoice</option>
//             <option value="Proforma Invoice">Proforma Invoice</option>
//           </select>
//         </div>
//       </div>

//       {/* CUSTOMER DETAILS */}
//       <div className="invoice-row">
//         <div className="invoice-field" style={{ position: "relative" }}>
//           <label>Customer Name *</label>
//           <input
//             placeholder="Enter Customer Name"
//             value={customerName}
//             autoComplete="off"
//             name="customer"
//             onChange={handleChange}
//             onKeyDown={(e) => handleKeyDown(e, handleCustomerSelect)}
//           />
//           {suggestions.length > 0 && (
//             <ul className="suggestion-box">
//               {suggestions.map((c, index) => (
//                 <li
//                   key={c._id}
//                   ref={(el) => (suggestionRefs.current[index] = el)}
//                   onClick={() => handleCustomerSelect(c)}
//                   style={{
//                     background:
//                       index === highlightIndex ? "#e0e0e0" : "transparent",
//                   }}
//                 >
//                   {c.name} — {c.phone}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="invoice-field">
//           <label>Bill Type *</label>
//           <select
//             value={billType}
//             onChange={(e) => setBillType(e.target.value)}
//           >
//             <option value="Cash">Cash</option>
//             <option value="Credit">Credit</option>
//           </select>
//         </div>

//         <div className="invoice-field">
//           <label>GST Type *</label>
//           <select value={gstType} onChange={(e) => setGstType(e.target.value)}>
//             <option value="GST">GST</option>
//             <option value="IGST">IGST</option>
//             <option value="NOTax">No Tax</option>
//           </select>
//         </div>

//         <div className="invoice-field">
//           <label>All Amounts Are *</label>
//           <select
//             value={amountType}
//             onChange={(e) => setAmountType(e.target.value)}
//           >
//             <option value="No Tax">No Tax</option>
//             <option value="Including Tax">Including Tax</option>
//             <option value="Excluding Tax">Excluding Tax</option>
//           </select>
//         </div>
//       </div>

//       {/* ITEM INPUT */}
//       <div className="item-input-row" style={{ position: "relative" }}>
//         <div className="product-suggest-container" style={{ position: "relative" }}>
//           <input
//             placeholder="Product Name"
//             name="product"
//             value={item.product}
//             onChange={handleChange}
//             autoComplete="off"
//             onKeyDown={(e) => handleKeyDown(e, handleProductSelect)}
//           />
//           {suggestions.length > 0 && (
//             <ul className="suggestion-box">
//               {suggestions.map((p, index) => (
//                 <li
//                   key={p._id}
//                   ref={(el) => (suggestionRefs.current[index] = el)}
//                   onClick={() => handleProductSelect(p)}
//                   style={{
//                     background:
//                       index === highlightIndex ? "#e0e0e0" : "transparent",
//                   }}
//                 >
//                   {p.name} — ₹{p.saleRate}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <input
//           placeholder="QTY"
//           name="qty"
//           type="number"
//           value={item.qty}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="MRP"
//           name="mrp"
//           type="number"
//           value={item.mrp}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="Rate"
//           name="rate"
//           type="number"
//           value={item.rate}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="DIS %"
//           name="dis"
//           type="number"
//           value={item.dis}
//           onChange={handleChange}
//         />
//         <select name="tax" value={item.tax} onChange={handleChange}>
//           <option value="0">0</option>
//           <option value="5">5</option>
//           <option value="12">12</option>
//           <option value="18">18</option>
//           <option value="28">28</option>
//         </select>
//         <button onClick={addItem}>Add</button>
//       </div>

//       {/* ITEM TABLE */}
//       <h3>Items List:</h3>
//       <div className="table-container">
//         <table className="invoice-table">
//           <thead>
//             <tr>
//               <th>PRODUCT NAME</th>
//               <th>QTY</th>
//               <th>MRP</th>
//               <th>RATE</th>
//               <th>DIS%</th>
//               <th>GST%</th>
//               <th>TOTAL</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((itm, idx) => (
//               <tr key={idx}>
//                 <td>{itm.product}</td>
//                 <td>{itm.qty}</td>
//                 <td>₹{itm.mrp}</td>
//                 <td>₹{itm.rate}</td>
//                 <td>{itm.dis}%</td>
//                 <td>{itm.tax}%</td>
//                 <td>₹{calculateItemBreakdown(itm).totalAmount.toFixed(2)}</td>
//                 <td>
//                   <button onClick={() => deleteItem(idx)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* FOOTER */}
//       <div className="invoice-footer">
//         <div>Total Qty: {quantity}</div>
//         <div className="payable">Payable: ₹{subtotal.toFixed(2)}</div>
//       </div>

//       <div style={{ textAlign: "right", marginTop: "20px" }}>
//         <button onClick={handleSave} className="save-btn">
//           Save & View Invoice
//         </button>
//       </div>
//     </>
//   );
// };

// export default InvoiceApp;
