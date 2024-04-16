//src/components/CheckoutPage

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext.js'; //used for managing the cart state 
import axios from 'axios';

const CheckoutPage = ({ setCartCount }) => {
    const [isOrderSucccessful, setIsOrderSuccessful] = useState(false);
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const items = [];

        // Iterate over query parameters to extract cart items
        for (const [key, value] of searchParams.entries()) {
            if (key.startsWith('item')) {
                items.push(JSON.parse(value));
            }
        }

        setCartItems(items);
    }, [location]);

    //Calculate total function
    const calculateTotal = () => {
      let totalCost = 0;

      cartItems.forEach(item => {
        totalCost += item.price * item.quantity;
      })
      return totalCost.toFixed(2);
    }

    const total = calculateTotal();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(null);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(null);
   }
  }
  const validatePhone = (value) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(value)) {
      setPhoneError('Invalid phone number format. Example: (123) 456-7890');
    } else {
      setPhoneError(null);
    }
  }

  //Place the order and send to backend 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    //construct order data
    const orderData = {
      fullName, 
      email,
      phone, 
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      items: cartItems,
      total
    };
    console.log("Order Submitted here is the orderData:", orderData);
    try {
      const response = await axios.post('http://localhost:3000/addOrder', orderData, {
        withCredentials: true, // Include only if necessary 
        headers: {
          'Content-Type':'application/json'
        }
      });
     
      if (response.status === 201) {
        console.log("Order submitted successfully");
        setCartCount(0);
        setIsOrderSuccessful(true);
        alert('Thank you for your order! A detailed summary will be sent to the email provided');
        navigate('/')
        const clearCart = () => {
          setCartItems([]);
          localStorage.removeItems('cartItems');
        };
      } else {
        console.error('Order submission Failed:', response);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  

    return (
        <div className="checkout-page-container">
          <div className="checkout-flex-container"></div>
            <div className="checkout-flex_item checkout-form">
              <form onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
                <div>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type ="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Email">Email Address:</label>
                  <input
                    type ="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                  />
                  {emailError && <p style={{color: 'red '}}>{emailError}</p>}
                </div>
                <div>
                  <label htmlFor="Phone">Phone Number:</label>
                  <input
                    type ="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      validatePhone(e.target.value);
                    }}
                  />
                  {phoneError && <p style={{color:'red' }}>{phoneError}</p>}
                </div>
                <div>
                  <label htmlFor="addressLine1">Address Line 1:</label>
                  <input
                    type ="text"
                    id="addressLine1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="addressLine2">Address Line 2:</label>
                  <input
                    type ="text"
                    id="addressLine2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="city">City:</label>
                  <input
                    type ="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="State">State:</label>
                  <input
                    type ="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="zipCode">Zip Code:</label>
                  <input
                    type ="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="checkout-flex-item">
              <div className="order-summary-box">
                <h2>Order Summary</h2>
                <div className="order-summary">
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <p>{item.title} - Author: {item.first_name} {item.last_name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Total: ${total}</p>
                </div>
              </div>
              <button className="submit-button" onClick={(handleSubmit)}>Place Order</button>
            </div>
        </div>
        
    );
};

export default CheckoutPage;

