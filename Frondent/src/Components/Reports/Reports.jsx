// Reports.js
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import "./Reports.css";

const Reports = () => {
  const [salesSummary, setSalesSummary] = useState({});
  const [purchaseSummary, setPurchaseSummary] = useState({});
  const [inventorySummary, setInventorySummary] = useState({});
  const [financeSummary, setFinanceSummary] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      const sales = await Axios.get("http://localhost:4000/reports/sales-summary");
      const purchases = await Axios.get("http://localhost:4000/reports/purchase-summary");
      const inventory = await Axios.get("http://localhost:4000/reports/inventory-summary");
      const finance = await Axios.get("http://localhost:4000/reports/finance-summary");

      setSalesSummary(sales.data);
      setPurchaseSummary(purchases.data);
      setInventorySummary(inventory.data);
      setFinanceSummary(finance.data);
    };

    fetchReports();
  }, []);

  const chartData = [
    { name: "Sales", value: salesSummary.totalSales || 0 },
    { name: "Purchases", value: purchaseSummary.totalPurchase || 0 },
    { name: "Inventory", value: inventorySummary.totalStock || 0 },
    { name: "Revenue", value: financeSummary.totalRevenue || 0 },
    { name: "Expenses", value: financeSummary.totalExpenses || 0 },
    { name: "Net Profit", value: financeSummary.netProfit || 0 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reports & Analytics</h1>

      <div className="report-summary">
        <div className="summary-card">Total Sales: ₹{salesSummary.totalSales || 0}</div>
        <div className="summary-card">Total Orders: {salesSummary.totalOrders || 0}</div>
        <div className="summary-card">Total Purchases: ₹{purchaseSummary.totalPurchase || 0}</div>
        <div className="summary-card">Total Products in Inventory: {inventorySummary.totalStock || 0}</div>
        <div className="summary-card">Revenue: ₹{financeSummary.totalRevenue || 0}</div>
        <div className="summary-card">Expenses: ₹{financeSummary.totalExpenses || 0}</div>
        <div className="summary-card">Net Profit: ₹{financeSummary.netProfit || 0}</div>
      </div>

      <h2 style={{ marginTop: "30px" }}>Financial Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1e3c72" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reports;
