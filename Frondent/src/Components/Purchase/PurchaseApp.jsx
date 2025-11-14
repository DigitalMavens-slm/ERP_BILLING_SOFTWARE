import React, { useState, useEffect ,} from "react";
import axios from "axios";
import "./PurchaseApp.css";
import {useSuggestion} from "../../Context/KeyBoardContext"
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const PurchaseApp = () => {
  const navigate = useNavigate();

  const {
  suggestions,
  setSuggestions,
  highlightIndex,
  handleKeyDown,
  suggestionRefs,
} = useSuggestion();


  // 🔹 Basic Details
  const [billNum, setBillNum] = useState("");
  const [date, setDate] = useState("");
  const [purchaseType, setPurchaseType] = useState("Purchase");
  const [supplierName, setSupplierName] = useState("");
  const [supplierDetails, setSupplierDetails] = useState({
    supplierId: "",
    name:"",
    phone: "",
    gstin: "",
    email: "",
    address: "",
  });

  // 🔹 Configuration
  const [billType, setBillType] = useState("Cash");
  const [gstType, setGstType] = useState("GST");
  const [amountType, setAmountType] = useState("Excluding Tax");

  // 🔹 Data Lists
  const [productsList, setProductsList] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedName,setSelectedName]=useState("")

  // 🔹 Product Item
  const [item, setItem] = useState({
    product: "",
    qty: 0,
    mrp: 0,
    rate: 0,
    dis: 0,
    tax: 0,
  });

  const [items, setItems] = useState([]);

  // ✅ Fetch all Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        // console.log("✅ Products:", res.data);
        setProductsList(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch all Suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/suppliers`);
        // console.log("✅ Suppliers:", res.data);
        setSuppliersList(res.data);
        // console.log(suppliersList.name)
      } catch (err) {
        console.error("❌ Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

  // ✅ Auto Bill No + Date
  useEffect(() => {
    const fetchNextBillNum = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/purchases/next-bill-num`);
        console.log(res.data.nextBillNum)
        console.log(res)
        setBillNum(res.data.nextBillNum);
      } catch (err) {
        console.error("Error fetching bill number:", err);
        setBillNum("BILL0001");
      }
      setDate(new Date().toISOString().split("T")[0]);
    };
    fetchNextBillNum();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔹 Supplier Suggestion
if (name === "supplier") {
  setSupplierName(value);

  if (value.trim().length > 0) {
    const filtered = suppliersList.filter((s) =>
      (s.supplierName || s.name || "")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  } else {
    setFilteredSuppliers([]);
  }
  return;
}

    // 🔹 Product Suggestion
    if (name === "product") {
      setItem((prev) => ({ ...prev, product: value }));
      if (value.trim().length > 0) {
        const filtered = productsList.filter((p) =>
          p.name?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
      return;
    }

    setItem((prev) => ({
      ...prev,
      [name]: ["qty", "mrp", "rate", "dis"].includes(name)
        ? Number(value)
        : value,
    }));
  };

 


  const selectSupplier = (name) => {
  // setSupplierName(name);

  const selected =
  suppliersList.find(
    (s) => s.supplierName === name || s.name === name
  );


  if (selected) {
    setSupplierDetails({
      supplierId: selected._id,
      // name:selected.name || "",
      phone: selected.phone || "",
      gstin: selected.gstin || "",
      email: selected.email || "",
      address: selected.address || "",
    });
    console.log(selected.name)
    setSelectedName(selected.name || "")
   
  }

  setFilteredSuppliers([]);
};

  // ✅ Select Product
  const selectProduct = (selectedName) => {
    const selected = productsList.find((p) => p.name === selectedName);
    if (selected) {
      setItem({
        ...item,
        product: selected.name,
        mrp: selected.mrp || 0,
        rate: selected.purchaseRate || 0,
        tax: selected.gst || 18,
      });
    }
    setFilteredProducts([]);
  };

  // ✅ Add Item
  const addItem = () => {
    if (!item.product.trim()) return alert("Product Name required!");
    if (item.qty <= 0) return alert("Quantity must be > 0!");
    if (item.rate <= 0) return alert("Rate must be > 0!");
    setItems((prev) => [...prev, item]);
    setItem({ product: "", qty: 0, mrp: 0, rate: 0, dis: 0, tax: 0 });
  };

  // ✅ Delete Item
  const deleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Calculate Tax Logic
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

  const subtotal = items.reduce(
    (acc, itm) => acc + calculateItemBreakdown(itm).totalAmount,
    0
  );
  const quantity = items.reduce((acc, itm) => acc + itm.qty, 0);

  // ✅ Save Purchase
  const handleSave = async () => {
    if (items.length === 0) return alert("No items added!");
    // if (!supplierName.trim()) return alert("Supplier Name required!");

     if (!supplierDetails.supplierId) {
    return alert("Please select a valid supplier from suggestions!");
  }

    const purchaseData = {
      supplierId: supplierDetails.supplierId,
      // billNum,
      date,
      purchaseType,
      // supplierName,
      supplierName: selectedName,
      billType,
      gstType,
      amountType,
      items,
      subtotal,
      totalQty: quantity,
    };

    try {
     const res= await axios.post(`${API_URL}/api/purchases`, purchaseData);
      setBillNum(res.data.nextBillNum);
    setDate(new Date().toISOString().split("T")[0]);
      alert("PURCHASE BILL GENERATED")
      setSelectedName("")
      // navigate("/purchase-details", { state: { purchaseData, supplierDetails } });
      setItems([])
      // setBillNum(res.data.billNum)
      // setBillNum(res.data.data.billNum);
      console.log(res)
      console.log(res.data)
    } catch (err) {
      console.error("Error saving purchase:", err);
      alert("Error saving purchase!");
    }
  };

  return (
    <div className="purchase-app">
      {/* HEADER SECTION */}
      <div className="purchase-header">
        <div className="purchase-field">
          <label>Bill No *</label>
          <input value={billNum} readOnly />
        </div>

        <div className="purchase-field">
          <label>Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="purchase-field">
          <label>Purchase Type *</label>
          <select
            value={purchaseType}
            onChange={(e) => setPurchaseType(e.target.value)}
          >
            <option value="Purchase">Purchase</option>
            <option value="Purchase Return">Purchase Return</option>
          </select>
        </div>
      </div>

      {/* SUPPLIER SECTION */}
      <div className="purchase-row">
        <div className="purchase-field" style={{ position: "relative" }}>
          <label>Supplier Name *</label>
          <input
            placeholder="Enter Supplier Name"
            value={selectedName}
            name="supplier"
            onChange={handleChange}
            // onClick={()=>filteredSuppliers}
              onClick={() => {
    // 🔹 When user just clicks without typing, show all suppliers
    if (filteredSuppliers.length === 0) {
      setFilteredSuppliers(suppliersList);
    }
  }}
  onFocus={() => {
    // 🔹 Also works if user tabs into input field
    if (filteredSuppliers.length === 0) {
      setFilteredSuppliers(suppliersList);
    }
  }}
              
              onKeyDown={(e) => handleKeyDown(e, selectSupplier)}
            autoComplete="off"
          />
          {filteredSuppliers.length > 0 && (
            <ul className="suggestion-box">
              
{filteredSuppliers.map((s) => (
  <>
  <li key={s._id} onClick={() => selectSupplier(s.supplierName || s.name)}
    ref={(el) => (suggestionRefs.current[s] = el)} // ✅ scroll into view
        className={highlightIndex === s ? "highlighted" : ""} // ✅ visual highlight
  >

                {s.supplierName || s.name}  
    </li>
    </>
)
)
}
              
<button onClick={()=>navigate("/setting/customer")}>AddCustomer</button>
            </ul>
          )}
        </div>

        <div className="purchase-field">
          <label>Bill Type *</label>
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        <div className="purchase-field">
          <label>GST Type *</label>
          <select
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
          >
            <option value="GST">GST</option>
            <option value="IGST">IGST</option>
            <option value="No Tax">No Tax</option>
          </select>
        </div>

        <div className="purchase-field">
          <label>Amount Type *</label>
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

      {/* ITEM ENTRY */}
      <div className="purchase-item-row" style={{ position: "relative" }}>
        <div className="product-suggest-container">
          <input
            placeholder="Product Name"
            name="product"
            value={item.product}
            onChange={handleChange}
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

        <input
          placeholder="QTY"
          name="qty"
          type="number"
          value={item.qty}
          onChange={handleChange}
        />
        <input
          placeholder="MRP"
          name="mrp"
          type="number"
          value={item.mrp}
          onChange={handleChange}
        />
        <input
          placeholder="Rate"
          name="rate"
          type="number"
          value={item.rate}
          onChange={handleChange}
        />
        <input
          placeholder="DIS %"
          name="dis"
          type="number"
          value={item.dis}
          onChange={handleChange}
        />
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
      <div className="table-container">
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>MRP</th>
              <th>Rate</th>
              <th>Dis%</th>
              <th>GST%</th>
              <th>Total</th>
              <th>Action</th>
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

      {/* FOOTER */}
      <div className="purchase-footer">
        <div>Total Qty: {quantity}</div>
        <div className="payable">Payable Amount: ₹{subtotal.toFixed(2)}</div>
      </div>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button onClick={handleSave} className="save-btn">
          Save & View Purchase
        </button>
      </div>
    </div>
  );
};

export default PurchaseApp;
