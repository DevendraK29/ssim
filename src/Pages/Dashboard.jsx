import { Navigate } from "react-router-dom";
import "../styles/Dashboard.css"
import { useState } from "react";

function Dashboard() {
  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">SSIM</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Products</li>
          <li>Sales</li>
          <li>Suppliers</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main */}
      <div className="main">
        {/* Top bar */}
        <div className="topbar">
          <input type="text" placeholder="Search products..." />
          <div className="user">Admin</div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card purple">
            <h3>Total Sales</h3>
            <p className="big">₹ 76,100</p>
            <span>This month</span>
          </div>

          <div className="card blue">
            <h3>Products</h3>
            <p className="big">128</p>
            <span>In stock</span>
          </div>

          <div className="card green">
            <h3>Low Stock</h3>
            <p className="big">7</p>
            <span>Need refill</span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="box">
            <h3>Recent Sales</h3>
            <ul>
              <li>Notebook - ₹120</li>
              <li>Pen Pack - ₹80</li>
              <li>Marker - ₹60</li>
              <li>Files - ₹200</li>
            </ul>
          </div>

          <div className="box">
            <h3>Quick Actions</h3>
            <button>Add Product</button>
            <button className="secondary">New Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
