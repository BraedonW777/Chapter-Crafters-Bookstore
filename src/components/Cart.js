// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/addToCart', { withCredentials: true });
                console.log('response data from backend', response.data);
                setCartItems(response.data); //there was an error here that would always set the cart to an empty array after fecthing the cart infomation from the backend -bw
                
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

    const removeItem = async (bookId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/addToCart/${bookId}`, { withCredentials: true });
            console.log(response.data); // Log the response from the backend
            // Remove the item from the cartItems state
            setCartItems(cartItems.filter(item => item.book_id !== bookId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    return (
      <div>
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
          ) : (
              <ul>
                  {/* Use .map() to iterate over the cartItems array */}
                  {cartItems.map(item => (
                      <li key={item.book_id}> {/* Make sure a unique id exists. Added link back to book details from each book in the cart -bw */}
                          <Link to={`/books/${item.book_id}`}>{item.title}</Link> by {item.first_name} {item.last_name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                          <button class="button" onClick={() => removeItem(item.book_id)}>Remove</button> {/* Button to remove item */}
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
};

export default Cart;
