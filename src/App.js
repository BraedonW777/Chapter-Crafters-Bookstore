// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Sales from './components/Sales';
import Cart from './components/Cart';
import './App.css'; // Import your CSS file

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/sales">Sales</Link>
            </li>
            <li className='cart-link'>
              <Link to ="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Chapter Crafters Bookstore</h1>
      <p>Our goal is to provide the best literature possible to our customers.</p>
    </div>
  );
};

export default App;
