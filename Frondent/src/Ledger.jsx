
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ledger.css"

// const API_URL = import.meta.env.VITE_API_URL;

// export default function CustomerLedger() {
//   const [ledger, setLedger] = useState([]);
//   const [customerId, setCustomerId] = useState("");
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showList, setShowList] = useState(false);

//   useEffect(() => {
//     if (!customerId) return;
//     axios
//       .get(`${API_URL}/api/ledger/${customerId}`)
//       .then((res) => setLedger(res.data.ledger || []))
//       .catch((err) => console.error("Ledger fetch error:", err));
//   }, [customerId]);

//   const handleChange = async (value) => {
//     console.log(value)
//     setQuery(value);
//   //    if (!value.trim()) {
//   //   setSuggestions([]);
//   //   setShowList(false);
//   //   return;
//   // }
//     try {
//       const res = await axios.get(`${API_URL}/api/suggest/customers?query=${value}`);
//       setSuggestions(res.data);
//       setShowList(true);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//     }
//   };

  
//   const handleSelect = async (customer) => {
//     const res = await axios.get(`${API_URL}/api/customers/${customer._id}`);
//     setShowList(false);
//     setCustomerId(res.data._id);
//     setQuery(res.data.name); // ✅ also show name in input
//   };

//   return (
//     <div className="ledger-container">
//       <h2 className="ledger-title">📒 Customer Ledger</h2>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter customer name..."
//           value={query}
//           onChange={(e) => handleChange(e.target.value)}
//           className="search-input"
//         />
//         {showList && suggestions.length > 0 && (
//           <ul className="suggestion-list">
//             {suggestions.map((cust) => (
//               <li
//                 key={cust._id}
//                 className="suggestion-item"
//                 onClick={() => handleSelect(cust)}
//               >
//                 {cust.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <table className="ledger-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Particulars</th>
//             <th>Invoice No</th>
//             <th>Debit (₹)</th>
//             <th>Credit (₹)</th>
//             <th>Balance (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ledger.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="no-data">
//                 No ledger records found
//               </td>
//             </tr>
//           ) : (
//             ledger.map((row, i) => (
//               <tr key={i}>
//                 <td>{new Date(row.date).toLocaleDateString()}</td>
//                 <td>{row.particulars}</td>
//                 <td>{row.invoiceNo}</td>
//                 <td>{typeof row.debit === "number" ? row.debit.toFixed(2) : "-"}</td>
//                 <td>{typeof row.credit === "number" ? row.credit.toFixed(2) : "-"}</td>
//                 <td>{typeof row.balance === "number" ? row.balance.toFixed(2) : "-"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomerLedger() {
  const [ledger, setLedger] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!customerId) return;
    axios
      .get(`${API_URL}/api/ledger/${customerId}`)
      .then((res) => setLedger(res.data.ledger || []))
      .catch((err) => console.error("Ledger fetch error:", err));
  }, [customerId]);

  const handleChange = async (value) => {
    setQuery(value);

    try {
      const res = await axios.get(`${API_URL}/api/suggest/customers?query=${value}`);
      setSuggestions(res.data);
      setShowList(true);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleSelect = async (customer) => {
    const res = await axios.get(`${API_URL}/api/customers/${customer._id}`);
    setShowList(false);
    setCustomerId(res.data._id);
    setQuery(res.data.name);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-6">
        📒 Customer Ledger
      </h2>

      {/* Search Box */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Enter customer name..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 border border-yellow-400 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
        />

        {showList && suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border border-yellow-400 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-20">
            {suggestions.map((cust) => (
              <li
                key={cust._id}
                className="p-3 cursor-pointer hover:bg-yellow-100"
                onClick={() => handleSelect(cust)}
              >
                {cust.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-yellow-500">
        <table className="w-full border-collapse">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Particulars</th>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-right">Debit (₹)</th>
              <th className="p-3 text-right">Credit (₹)</th>
              <th className="p-3 text-right">Balance (₹)</th>
            </tr>
          </thead>

          <tbody>
            {ledger.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-5 text-red-500 text-lg font-semibold"
                >
                  No ledger records found
                </td>
              </tr>
            ) : (
              ledger.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-yellow-300 hover:bg-yellow-100 transition"
                >
                  <td className="p-3">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{row.particulars}</td>
                  <td className="p-3">{row.invoiceNo}</td>
                  <td className="p-3 text-right text-red-600 font-semibold">
                    {typeof row.debit === "number"
                      ? row.debit.toFixed(2)
                      : "-"}
                  </td>
                  <td className="p-3 text-right text-green-600 font-semibold">
                    {typeof row.credit === "number"
                      ? row.credit.toFixed(2)
                      : "-"}
                  </td>
                  <td className="p-3 text-right font-bold text-gray-800">
                    {typeof row.balance === "number"
                      ? row.balance.toFixed(2)
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

