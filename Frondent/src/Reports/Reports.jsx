// import React, { useEffect, useState } from "react";
// import axios from "axios"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import "./Reports.css";
// const API_URL = import.meta.env.VITE_API_URL;

// export default function ReportsPage() {
//   const [filters, setFilters] = useState({
//     from: "",
//     to: "",
//     type: "sales",
//     party: "all",
//   });

//   const [kpis, setKpis] = useState({
//     totalSales: 0,
//     totalPurchases: 0,
//     netCash: 0,
//     invoices: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);



//   // ✅ Fetch from backend
//   const fetchReportData = async (params = filters) => {
//     try {
//       setLoading(true);
//       const query = new URLSearchParams({
//         from: params.from,
//         to: params.to,
//         type: params.type,
//         party: params.party,
//       }).toString();

//       const res = await axios.get(`${API_URL}/api/reports?${query}`);
//       const data = await res.data;

//       setKpis(data.kpis || {});
//       setChartData(data.chartData || []);
//       setRows(data.records || []);
//     } catch (err) {
//       console.error("Error fetching reports:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReportData();
//   },[filters.type]);

//   const onFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const applyFilters = () => fetchReportData(filters);

//   const resetFilters = () => {
//     const base = { from: "", to: "", type: "sales", party: "all" };
//     setFilters(base);
//     fetchReportData(base);
//   };

//   const formatCurrency = (n) =>
//     n?.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }) ?? "—";

//   return (
//     <div className="reports-container">
//       <header className="reports-header">
//         <h1>Reports</h1>
//         <p>Business overview — sales, purchase, and cashflow reports.</p>
//       </header>

//       <div className="reports-layout">
//         {/* Sidebar Filters */}
//         <aside className="filters-card">
//           <h2>Filters</h2>

//           <label>From</label>
//           <input
//             type="date"
//             name="from"
//             value={filters.from}
//             onChange={onFilterChange}
//           />

//           <label>To</label>
//           <input
//             type="date"
//             name="to"
//             value={filters.to}
//             onChange={onFilterChange}
//           />

//           <label>Report Type</label>
//           <select name="type" value={filters.type} onChange={onFilterChange}>
//             <option value="sales">Sales</option>
//             <option value="purchases">Purchases</option>
//             <option value="cashflow">Cash Flow</option>
//           </select>

//           <label>Customer / Vendor</label>
//           <input
//             name="party"
//             placeholder="All"
//             value={filters.party}
//             onChange={onFilterChange}
//           />

//           <div className="filter-buttons">
//             <button className="apply-btn" onClick={applyFilters}>
//               Apply
//             </button>
//             <button className="reset-btn" onClick={resetFilters}>
//               Reset
//             </button>
//           </div>
//         </aside>

//         {/* Main Section */}
//         <main className="reports-main">
//           {/* KPI Cards */}
//           <div className="kpi-grid">
//             <KpiCard title="Total Sales" value={formatCurrency(kpis.totalSales)} />
//             <KpiCard
//               title="Total Purchases"
//               value={formatCurrency(kpis.totalPurchases)}
//             />
//             <KpiCard title="Net Cash" value={formatCurrency(kpis.netCash)} />
//             <KpiCard title="Invoices" value={kpis.invoices} />
//           </div>

//           {/* Chart Section */}
//           <section className="chart-section">
//             <h3>Sales Trend</h3>
//             <div className="chart-wrapper">
//               <ResponsiveContainer width="100%" height={260}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#4F46E5"
//                     strokeWidth={2}
//                     dot={{ r: 3 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </section>

//           {/* Records Table */}
//           <section className="records-section">
//             <h3>Records</h3>
//             <div className="table-wrapper">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Ref</th>
//                     <th>Party</th>
//                     <th>Type</th>
//                     <th className="text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan={5} className="text-center">
//                         Loading...
//                       </td>
//                     </tr>
//                   ) : rows.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="text-center">
//                         No records found
//                       </td>
//                     </tr>
//                   ) : (
//                     rows.map((r) => (
//                       <tr key={r._id}>
//                         <td>{r.date}</td>
//                         <td>{r.reference}</td>
//                         <td>{r.party}</td>
//                         <td>{r.type}</td>
//                         <td className="text-right">{formatCurrency(r.amount)}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// function KpiCard({ title, value }) {
//   return (
//     <div className="kpi-card">
//       <div className="kpi-title">{title}</div>
//       <div className="kpi-value">{value}</div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// import "./Reports.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    type: "sales",
    party: "all",
  });

  const [kpis, setKpis] = useState({
    totalSales: 0,
    totalPurchases: 0,
    netCash: 0,
    invoices: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch report data
  const fetchReportData = async (params = filters) => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        from: params.from,
        to: params.to,
        type: params.type,
        party: params.party,
      }).toString();

      const res = await axios.get(`${API_URL}/api/reports?${query}`);
      const data = res.data;

      // FIX 1 → backend sends chart, not chartData
      setKpis(data.kpis || {});
      setChartData(data.chart || data.chartData || []);
      setRows(data.records || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };


  
  // Auto fetch when type changes
  useEffect(() => {
    fetchReportData(filters);
  }, [filters.type]);

  // Filters change
  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => fetchReportData(filters);

  const resetFilters = () => {
    const base = { from: "", to: "", type: "sales", party: "all" };
    setFilters(base);
    fetchReportData(base);
  };

  const formatCurrency = (n) =>
    n?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }) ?? "—";

  // Dynamic chart title
  const getChartTitle = () => {
    if (filters.type === "sales") return "Sales Trend";
    if (filters.type === "purchases") return "Purchase Trend";
    if (filters.type === "cashflow") return "Cash Flow Trend";
  };

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h1>Reports</h1>
        <p>Business overview — sales, purchase, and cashflow reports.</p>
      </header>

      <div className="reports-layout">
        {/* Sidebar Filters */}
        <aside className="filters-card">
          <h2>Filters</h2>

          <label>From</label>
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={onFilterChange}
          />

          <label>To</label>
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={onFilterChange}
          />

          <label>Report Type</label>
          <select name="type" value={filters.type} onChange={onFilterChange}>
            <option value="sales">Sales</option>
            <option value="purchases">Purchases</option>
            <option value="cashflow">Cash Flow</option>
          </select>

          <label>Customer / Vendor</label>
          <input
            name="party"
            placeholder="All"
            value={filters.party}
            onChange={onFilterChange}
          />

          <div className="filter-buttons">
            <button className="apply-btn" onClick={applyFilters}>
              Apply
            </button>
            <button className="reset-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="reports-main">
          {/* KPI Cards */}
          <div className="kpi-grid">
            <KpiCard title="Total Sales" value={formatCurrency(kpis.totalSales)} />
            <KpiCard
              title="Total Purchases"
              value={formatCurrency(kpis.totalPurchases)}
            />
            <KpiCard title="Net Cash" value={formatCurrency(kpis.netCash)} />
            <KpiCard title="Invoices" value={kpis.invoices} />
          </div>

          {/* Chart Section */}
          <section className="chart-section">
            <h3>{getChartTitle()}</h3>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Records Table */}
          <section className="records-section">
            <h3>Records</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ref</th>
                    <th>Party</th>
                    <th>Type</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={r._id}>
                        <td>{r.date}</td>
                        <td>{r.reference}</td>
                        <td>{r.party}</td>
                        <td>{r.type}</td>
                        <td className="text-right">{formatCurrency(r.amount)}</td>
                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}
