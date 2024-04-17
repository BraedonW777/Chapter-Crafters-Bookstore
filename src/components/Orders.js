// src/components/Orders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filterError, setFilterError] = useState(null);

//Fetching orders from backend 
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/addOrder');
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  //for filtering pending or completed orders 
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setFilterError(null);

    try {
      const newFilteredOrders = orders.filter(order =>
        event.target.value === 'all'
          ? true
          : order.order_status === event.target.value
      );
      setFilteredOrders(newFilteredOrders);
    } catch (error) {
      setFilterError(error);
    }
  };

  return (
    <div className="orders-container"> {/* Class for the main container */}
      <h2 className="orders-heading">Orders</h2> 
      <select value={selectedStatus} onChange={handleStatusChange} className="order-status-select">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option> 
      </select>
  
      {isLoading ? (
        <p className="loading-message">Loading...</p> 
      ) : filterError ? (
        <p className="error-message">Error Filtering Orders: {error.message}</p> 
      ) : (
        <ul className="orders-list"> 
          {filteredOrders.map(order => ( 
            <li key={order.order_id} className="order-item"> 
              <div className="order-id">Order ID: {order.order_id}</div>
              <div className="customer-name">Customer Name: {order.customer_name}</div> 
              <div className="order-date">Date: {order.order_date}</div>
              <div className="shipping-address">Shipping Address: {order.shipping_address}</div>
              <div className="order-total">Total: ${order.total_price}</div>
              <div className="city">City: {order.city}</div>
              <div className=""></div> {/* space holder so order displays correctly*/}
              <div className="state">State: {order.state}</div>
              <div className=""></div> {/* space holder so order displays correctly*/}
              <div className="zipcode">Zipcode: {order.zipcode}</div>
              <h3 classname="item-heading">Items</h3>
              <ul className="order-items-list"> 
                {order.orderItems.map(item => (
                  <li key={item.book_id} className="order-item-detail"> 
                    {item.title} - Quantity: {item.quantity} - Price: ${item.item_price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

    


export default Orders;
