import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";


 const Header = () => {
 const navigate = useNavigate();
 const loginTime = localStorage.getItem("loginTime");
 //localStorage.setItem("loginTime", new Date().toLocaleString());
 const timeOnly = new Date().toLocaleTimeString("en-GB");
 localStorage.setItem("loginTime", timeOnly);


  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // (Optional) clear everything
    // localStorage.clear();
    // Redirect to login page
    navigate("/", { replace: true });
  };
  
  return (
    <> 
    <div className="header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <span className="app-title">ERP SYSTEM</span>
      </div>

      <div className="header-right">
      {loginTime && (
        <span className="user-name" style={{ float: "right" }}>
          Login Time: {loginTime}
        </span>
      )}
        <span className="user-name">Admin</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </>
  );
};

export default Header;
