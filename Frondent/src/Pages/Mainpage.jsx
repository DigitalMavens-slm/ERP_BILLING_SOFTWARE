// import React from 'react'
// import {Link ,Outlet} from "react-router-dom"
// import "./Mainpage.css"

// const Mainpage = () => {
//   return (
//     <>
        
//     <div className="Mainpage-container">
//             <div className="first">
//               <h2>BILLING SOFTWARE</h2>
//               <input/>
//               <img src="jpg" alt="loco" />
//             </div>
//         <div className="Mainpage-div">
//             <div className="Mainpage-content">
//              <Link to={"index"}> <div className="Main-inner-content">PURCHASE</div></Link>  
//              <Link to={"invoicecreate"}> <div className="Main-inner-content">INVOICE</div></Link> 
//               <Link to={"payment-updation"}> <div className="Main-inner-content">PAYMENT-UPDATION</div></Link>  
//              <Link to={"inventory"}> <div className="Main-inner-content">Inventory</div></Link>  
//              <Link to={"setting"}> <div className="Main-inner-content">Settings</div></Link> 
//              <Link to={"reports"}> <div className="Main-inner-content">Reports</div></Link>  
//              <Link to={"company"}> <div className="Main-inner-content">Company-Details</div></Link>  

//           </div>

//            <div className="Mainpage-right-content">
//           <Outlet />   {/* ← CHILD COMPONENTS RENDER HERE */}
//         </div>
//            </div>
    

//     </div>
//     </>
//   )
// }

// export default Mainpage







// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import { 
//   ShoppingCart, 
//   Home,
//   FileText, 
//   CreditCard, 
//   Boxes, 
//   Settings, 
//   BarChart, 
//   Building 
// } from "lucide-react";

// const Mainpage = () => {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col bg-blue-100">

//         {/* TOP HEADER */}
//         <header className="w-full bg-blue-700 text-white py-3 px-6 flex justify-between items-center shadow-md">
//           <h2 className="text-xl font-bold">BILLING SOFTWARE</h2>
//           <input
//             className="w-1/3 px-3 py-1 rounded-md outline-none text-black"
//             placeholder="Search invoices, contacts..."
//           />
//           <img src="jpg" alt="logo" className="w-10 h-10 bg-white rounded-full" />
//         </header>

//         {/* MAIN LAYOUT (SIDEBAR + CONTENT) */}
//         <div className="flex flex-1">

//           {/* SIDEBAR */}
//           <aside className="w-60 bg-blue-800 text-white p-4 flex flex-col gap-3">

//             <Link to="dashboard" className="sidebar-btn">
//               <Home className="icon" /> DASHBOARD
//             </Link>
    

//             <Link to="index" className="sidebar-btn">
//               <ShoppingCart className="icon" /> PURCHASE
//             </Link>

//             <Link to="invoicecreate" className="sidebar-btn">
//               <FileText className="icon" /> INVOICE
//             </Link>

//             <Link to="payment-updation" className="sidebar-btn">
//               <CreditCard className="icon" /> PAYMENT
//             </Link>

//             <Link to="inventory" className="sidebar-btn">
//               <Boxes className="icon" /> INVENTORY
//             </Link>

//             <Link to="setting" className="sidebar-btn">
//               <Settings className="icon" /> SETTINGS
//             </Link>

//             <Link to="reports" className="sidebar-btn">
//               <BarChart className="icon" /> REPORTS
//             </Link>

//             <Link to="company" className="sidebar-btn">
//               <Building className="icon" /> COMPANY
//             </Link>

//           </aside>

//           {/* RIGHT SIDE CONTENT */}
//           <main className="flex-1 bg-white p-6 overflow-y-auto">
//             <Outlet />
//           </main>

//         </div>
//       </div>
//     </>
//   );
// };

// export default Mainpage;





// import React, { useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import {
//   Home,
//   ShoppingCart,
//   FileText,
//   CreditCard,
//   Boxes,
//   Settings,
//   BarChart,
//   Building,
//   Bell,
//   User2,
//   ChevronDown,
//   Menu,
//   ChevronRight 
// } from "lucide-react";

// const Mainpage = () => {
//   const location = useLocation();
//   const [openPurchase, setOpenPurchase] = useState(false);
//   const [openSales, setOpenSales] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const isActive = (path) => location.pathname.includes(path);

//   return (
//     <div className="min-h-screen flex flex-col bg-blue-100">

//       {/* HEADER */}
//       <header className="w-full bg-blue-700 text-white py-3 px-4 flex justify-between items-center shadow-md">

//         {/* MOBILE MENU */}
//         <button
//           className="lg:hidden text-white"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           <Menu className="w-7 h-7" />
//         </button>

//         <h2 className="text-lg md:text-xl font-bold">BILLING SOFTWARE</h2>

//         <div className="flex items-center gap-3">
//           <input
//             className="hidden md:block w-48 lg:w-64 px-3 py-1 rounded-md outline-none text-black"
//             placeholder="Search invoices, contacts..."
//           />
//           <Bell className="w-6 h-6 cursor-pointer" />
//           <User2 className="w-7 h-7 cursor-pointer" />
//         </div>
//       </header>

//       <div className="flex flex-1">

//         {/* SIDEBAR */}
//         <aside
//           className={`
//             fixed lg:static top-0 left-0 h-full w-60 bg-blue-800 text-white p-4 flex flex-col gap-1
//             transition-transform duration-300 z-50
//             ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//           `}
//         >
//           {/* CLOSE BTN MOBILE */}
//           <button
//             className="lg:hidden mb-4 text-right"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <span className="text-white text-xl">✕</span>
//           </button>

//           {/* SIDEBAR BTNS SINGLE LINE */}
//           <Link
//             to="dashboard"
//             className={`sidebar-btn ${isActive("dashboard") ? "sidebar-active" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <Home className="icon" />
//               <span>DASHBOARD</span>
//             </div>
//           </Link>

//           {/* PURCHASE DROPDOWN */}
//           <div>
//             <button
//               className={`sidebar-btn w-full ${openPurchase ? "sidebar-active" : ""}`}
//               onClick={() => setOpenPurchase(!openPurchase)}
//             >
//               <div className="flex items-center gap-3">
//                 <ShoppingCart className="icon" />
//                 <span>PURCHASE</span>
//               </div>
//               <ChevronDown className="w-4 h-4" />
//             </button>

//             {/* {openPurchase && (
//               <div className="ml-6 mt-2 flex flex-col gap-2 text-sm">
//                 <Link to="index" className="bg-white-600 text-black font-bold font-w-20">+ New Purchase</Link>
//                 <Link to="purchase/list" className="hover:underline font-bold">+Purchase List</Link>
//                 <Link to="purchase/return" className="hover:underline font-bold">+ Purchase Return</Link>
//               </div>
//             )} */}


            
// {openPurchase && (
//   <div className="ml-6 mt-3 flex flex-col gap-3 text-base">

//     <Link
//       to="index"
//       className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-semibold hover:text-black"
//     >
//       <ChevronRight size={18} /> New Purchase
//     </Link>

//     <Link
//       to="purchaselist"
//       className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-semibold hover:text-black"
//     >
//       <ChevronRight size={18} /> Purchase List
//     </Link>

//     <Link
//       to="purchaseledger"
//       className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-semibold hover:text-black"
//     >
//       <ChevronRight size={18} /> Purchase Return
//     </Link>

//   </div>
// )}
//           </div>

//           {/* SALES DROPDOWN */}
//           <div>
            
//             <button className={`sidebar-btn w-full ${openSales ? "sidebar-active" : ""}`}
//               onClick={() => setOpenSales(!openSales)}>
//               <div className="flex items-center gap-3">
//                 <FileText className="icon" />
//                 <span>SALES</span>
//               </div>
//               <ChevronDown className="w-4 h-4" />
//             </button>

         

//             {/* {openSales && (
//   <div className="ml-6 mt-2 flex flex-col gap-2 text-sm">
//     <Link to="invoicecreate" className="flex items-center gap-2 hover:underline">
//       <ChevronRight size={16} /> New Sale
//     </Link>

//     <Link to="sales/list" className="flex items-center gap-2 hover:underline">
//       <ChevronRight size={16} /> Sales List
//     </Link>

//     <Link to="sales/return" className="flex items-center gap-2 hover:underline">
//       <ChevronRight size={16} /> Sales Return
//     </Link>
//   </div>
// )} */}

//  {openSales && (
// <div className="ml-6 mt-3 flex flex-col gap-3 text-base">
//   <Link
//     to="invoicecreate"
//     className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-semibold hover:text-black" 
//   >
//     <ChevronRight size={18} /> New Sale
//   </Link>

//   <Link
//     to="invoicelist"
//     className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-semibold hover:text-black" 
//   >
//     <ChevronRight size={18} /> Sales List
//   </Link>

//   <Link
//     to="sales/return"
//     className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-semibold hover:text-black" 
//   >
//     <ChevronRight size={18} /> Sales Return
//   </Link>
// </div>
// )} 
//           </div>

//           {/* OTHER MENU ITEMS */}
//           <Link
//             to="payment-updation"
//             className={`sidebar-btn ${isActive("payment-updation") ? "sidebar-active" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <CreditCard className="icon" />
//               <span>PAYMENT</span>
//             </div>
//           </Link>

//           <Link
//             to="inventory"
//             className={`sidebar-btn ${isActive("inventory") ? "sidebar-active" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <Boxes className="icon" />
//               <span>INVENTORY</span>
//             </div>
//           </Link>

//           <Link
//             to="setting"
//             className={`sidebar-btn ${isActive("setting") ? "sidebar-active" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <Settings className="icon" />
//               <span>SETTINGS</span>
//             </div>
//           </Link>

//           <Link
//             to="reports"
//             className={`sidebar-btn ${isActive("reports") ? "sidebar-active" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <BarChart className="icon" />
//               <span>REPORTS</span>
//             </div>
//           </Link>

//           <Link
//             to="company"
//             className={`sidebar-btn ${isActive("company") ? "sidebar-active" : ""}`}
//           >
//             <div className="flex items-center gap-3">
//               <Building className="icon" />
//               <span>COMPANY</span>
//             </div>
//           </Link>

//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="flex-1 bg-white p-4 md:p-6 overflow-y-auto shadow-inner">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// };

// export default Mainpage;






import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  FileText,
  CreditCard,
  Boxes,
  Settings,
  BarChart,
  Building,
  Bell,
  User2,
  Menu,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const Mainpage = () => {
  const location = useLocation();
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb]">

      {/* TOP NAVBAR */}
      <header className="w-full bg-white shadow flex justify-between items-center px-4 py-3 border-b">
        
        <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-7 h-7" />
        </button>

        <h1 className="text-xl font-bold text-blue-800">ERP Billing — SOFTWARE</h1>

        <div className="flex items-center gap-5">
          <Bell className="w-6 h-6 cursor-pointer" />
          <User2 className="w-7 h-7 cursor-pointer" />
        </div>
      </header>

      <div className="flex flex-1">

        {/* LEFT SIDEBAR */}
        <aside
          className={`
            fixed lg:static top-0 left-0 h-full w-64 bg-white border-r
            flex flex-col pt-4 transition-transform duration-300 z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >

          {/* Menu: SURVEY STYLE */}
          <Link
            to="dashboard"
            className={`sidebar-btn ${isActive("dashboard") ? "sidebar-active" : ""}`}
          >
            <Home size={20} />
            Dashboard
          </Link>

          {/* PURCHASE MENU */}
          <button
            onClick={() => setOpenPurchase(!openPurchase)}
            className={`sidebar-btn w-full justify-between ${
              openPurchase ? "sidebar-active" : ""
            }`}
          >
            <span className="flex gap-3">
              <ShoppingCart size={20} />
              Purchase
            </span>
            <ChevronDown size={18} />
          </button>

          {openPurchase && (
            <div className="flex flex-col">
              <Link to="index" className="sub-item"><ChevronRight size={16} /> New Purchase</Link>
              <Link to="purchaselist" className="sub-item"><ChevronRight size={16} /> Purchase List</Link>
              <Link to="purchaseledger" className="sub-item"><ChevronRight size={16} /> Purchase Return</Link>
            </div>
          )}

          {/* SALES MENU */}
          <button
            onClick={() => setOpenSales(!openSales)}
            className={`sidebar-btn w-full justify-between ${
              openSales ? "sidebar-active" : ""
            }`}
          >
            <span className="flex gap-3">
              <FileText size={20} />
              Sales
            </span>
            <ChevronDown size={18} />
          </button>

          {openSales && (
            <div className="flex flex-col">
              <Link to="invoicecreate" className="sub-item"><ChevronRight size={16} /> New Sale</Link>
              <Link to="invoicelist" className="sub-item"><ChevronRight size={16} /> Sales List</Link>
              <Link to="sales/return" className="sub-item"><ChevronRight size={16} /> Sales Return</Link>
            </div>
          )}

          {/* OTHER STATIC MENU ITEMS */}
          <Link
            to="payment-updation"
            className={`sidebar-btn ${isActive("payment-updation") ? "sidebar-active" : ""}`}
          >
            <CreditCard size={20} /> Payment
          </Link>

          <Link
            to="inventory"
            className={`sidebar-btn ${isActive("inventory") ? "sidebar-active" : ""}`}
          >
            <Boxes size={20} /> Inventory
          </Link>

          <Link
            to="setting"
            className={`sidebar-btn ${isActive("setting") ? "sidebar-active" : ""}`}
          >
            <Settings size={20} /> Settings
          </Link>

          <Link
            to="reports"
            className={`sidebar-btn ${isActive("reports") ? "sidebar-active" : ""}`}
          >
            <BarChart size={20} /> Reports
          </Link>

          <Link
            to="company"
            className={`sidebar-btn ${isActive("company") ? "sidebar-active" : ""}`}
          >
            <Building size={20} /> Company
          </Link>
        </aside>

        {/* RIGHT PANEL */}
        <main className="flex-1 p-6 bg-[#f5f7fb] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Mainpage;
