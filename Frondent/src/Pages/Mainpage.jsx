import React from 'react'
import {Link } from "react-router-dom"
import "./Mainpage.css"

const Mainpage = () => {
  return (
    <div className="Mainpage-container">
        <h1>Digi Voice Software</h1>
            <div className="Mainpage-content">
             <Link to={"index"}> <div className="Main-inner-content">Purchase</div></Link>  
             <Link to={"sales"}> <div className="Main-inner-content">Sales</div></Link> 
             <Link to={"employee"}> <div className="Main-inner-content">Employee  Details</div></Link> 
             <Link to={"inventory"}> <div className="Main-inner-content">Inventory</div></Link>  
             <Link to={"finance"}> <div className="Main-inner-content">Finance</div></Link>
             <Link to={"setting"}> <div className="Main-inner-content">Settings</div></Link> 
             <Link to={"reports"}> <div className="Main-inner-content">Reports</div></Link>  
             <Link to={"management"}> <div className="Main-inner-content">Usermanagement</div></Link>  

          </div>

    

    </div>
  )
}

export default Mainpage