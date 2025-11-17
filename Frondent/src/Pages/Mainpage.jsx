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







import React from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  ShoppingCart, 
  Home,
  FileText, 
  CreditCard, 
  Boxes, 
  Settings, 
  BarChart, 
  Building 
} from "lucide-react";

const Mainpage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-blue-100">

        {/* TOP HEADER */}
        <header className="w-full bg-blue-700 text-white py-3 px-6 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold">BILLING SOFTWARE</h2>
          <input
            className="w-1/3 px-3 py-1 rounded-md outline-none text-black"
            placeholder="Search invoices, contacts..."
          />
          <img src="jpg" alt="logo" className="w-10 h-10 bg-white rounded-full" />
        </header>

        {/* MAIN LAYOUT (SIDEBAR + CONTENT) */}
        <div className="flex flex-1">

          {/* SIDEBAR */}
          <aside className="w-60 bg-blue-800 text-white p-4 flex flex-col gap-3">

            <Link to="dashboard" className="sidebar-btn">
              <Home className="icon" /> DASHBOARD
            </Link>
    

            <Link to="index" className="sidebar-btn">
              <ShoppingCart className="icon" /> PURCHASE
            </Link>

            <Link to="invoicecreate" className="sidebar-btn">
              <FileText className="icon" /> INVOICE
            </Link>

            <Link to="payment-updation" className="sidebar-btn">
              <CreditCard className="icon" /> PAYMENT
            </Link>

            <Link to="inventory" className="sidebar-btn">
              <Boxes className="icon" /> INVENTORY
            </Link>

            <Link to="setting" className="sidebar-btn">
              <Settings className="icon" /> SETTINGS
            </Link>

            <Link to="reports" className="sidebar-btn">
              <BarChart className="icon" /> REPORTS
            </Link>

            <Link to="company" className="sidebar-btn">
              <Building className="icon" /> COMPANY
            </Link>

          </aside>

          {/* RIGHT SIDE CONTENT */}
          <main className="flex-1 bg-white p-6 overflow-y-auto">
            <Outlet />
          </main>

        </div>
      </div>
    </>
  );
};

export default Mainpage;









