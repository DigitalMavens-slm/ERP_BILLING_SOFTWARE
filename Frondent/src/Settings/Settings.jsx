
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import "./Settings.css"

const Settings = () => {
  const location = useLocation();

  // if current path includes /supplier → show only Outlet (child)
  const isChildPage = location.pathname !== "/setting";

  return (
    <div className="settings-container">
      {!isChildPage && (
        <>
          <h2>Settings Page</h2>
          <div className="setting-box-container">
          <Link to="supplier">
            <div className="settings-box">
                <img src="" alt=""/>
              <span>My Vendor</span>
            </div>
          </Link>

          <Link to={"customer"}>
          <div className="settings-box">
            <img src="" alt=""/>
            <span>My Clients</span>
          </div>
          </Link>
 
           <Link to={"subcategory"}>
          <div className="settings-box">
            <img src="" alt=""/>
            <span>Sub Categories</span>
          </div>
          </Link>

          <Link to={"category"}>
          <div className="settings-box">
            <img src="" alt=""/>
            <span> Categories</span>
          </div>
          </Link>

        
        <Link to={"brand"}>
          <div className="settings-box">
            <img src="" alt=""/>
            <span>My Brands</span>
          </div>
          </Link>

           <Link to={"product"}>
          <div className="settings-box">
            <img src="" alt=""/>
            <span>My Products</span>
          </div>
          </Link>

           <Link>
          <div className="settings-box">
            <img src="" alt=""/>
            <span>Sales Person</span>
          </div>
          </Link>
          </div>
        </>
      )}

      <Outlet />
    </div>
  );
};

export default Settings;
