// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/addToCart', { withCredentials: true });
                console.log('response data from backend', response.data);
                setCartItems([]);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);
    console.log('CartItems after setCartItems:', cartItems);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div>
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
          ) : (
              <ul>
                  {/* Use .map() to iterate over the cartItems array */}
                  {cartItems.map(item => (
                      <li key={item.book_id}> {/* Make sure a unique id exists */}
                          {item.title} by {item.first_name} {item.last_name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)} 
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
};

export default Cart;
