// CartContext.js
//Trying to use this to make cartItems a global variable so that the data changes anywhere in the app
//It's not working currently LK
import { createContext, useState, useContext } from 'react';
import  { useEffect } from 'react';
import axios from 'axios';
//import { response } from 'express';
//import Cart from '.././cartModel.js'; // Import the cart model


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null); // State to hold the current cart ID

    useEffect(() => {
        

        fetchCartData();
    }, []);
    
    const fetchCartData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/addToCart', { withCredentials: true });
            console.log('response data from in context fextCart Data backend:', response.data);
            
            // Assuming the cart ID is associated with the first item in the array
            const cartIdFromResponse = response.data[0]?.cart_id;
            console.log("response.data[0]?.cart_id", response.data[0]?.cart_id);
            setCartId(cartIdFromResponse);

            // Other logic to set cart items if needed

        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    

    // Function to delete the cart based on the cart ID
    const deleteCart = async () => {
        try {
            console.log("in the cart context delete Cart functon");
            console.log("cartID: ", cartId);
            await axios.delete(`http://localhost:3000/addToCart/${cartId}`);
            console.log("cartID: ", cartId);
            // Clear cart items and cart ID in the local state
            setCartItems([]);
            localStorage.setItem('cartCount', '0');
            //setCartId(null);
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    };

    const clearCart = () => {
        deleteCart(); // Call deleteCart function to delete the cart
    }
    
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartId, setCartId, clearCart, fetchCartData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
