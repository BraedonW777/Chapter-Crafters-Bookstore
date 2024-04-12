// src/App.js
import React from 'react';
//may not need this one --import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//temp comenting out unused imports
//import Dashboard from './components/Dashboard.js';
import Inventory from './components/Inventory.js';
import Orders from './components/Orders.js';
//import Sales from './components/Sales.js';
import Cart from './components/Cart.js';
import bookImage from './assets/book_image.jpg'; //import book image
import Details from './components/Details.js';
import './App.css'; // Import CSS file
//import { eventWrapper } from '@testing-library/user-event/dist/utils/index.js';


/**VVV this will always be on the top of the app VVV */
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
              <Link to="/inventory">Products</Link> {/*Chaning text of link to Products instead of inventory*/}
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li className='cart-link'>
              <Link to ="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          {/* temp commenting out unused links */}
          {/*<Route path="/dashboard" element={<Dashboard />} />*/}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          {/*<Route path="/sales" element={<Sales />} />*/}
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />{/*home link*/}
          <Route path="/books/:id" Component={Details} />
        </Routes>
      </div>
    </Router>
  );
};

/*This is what is displayed when at the '/' (Home) page */
const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Chapter Crafters Bookstore</h1>
      <img src={bookImage} alt="Books" style={{ width: '50%', maxWidth: '500px', margin: '20px auto' }} /> {/*Book image */}
      <p>"Our goal is to provide the best literature with the best prices possible to our customers."</p>
      <p>- Our Founder</p>
      <Link to="/inventory">
        <button className="button">View Products</button>{/*Putting a button under image to link to products */}
      </Link>
    </div>
  );
};

export default App;
