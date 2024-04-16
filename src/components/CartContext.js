// CartContext.js
//Trying to use this to make cartItems a global variable so that the data changes anywhere in the app
//It's not working currently LK
import { createContext, useState, useContext } from 'react';
import  { useEffect } from 'react';
//import { response } from 'express';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        //Clear cart on component mount (when webpage starts)
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        } else {
            //initial clearing
            clearCart();
        }
    }, []);
        

    const clearCart = () => setCartItems([]); // Function to clear cart
    console.log('In CartContext.js file here is the cart after calling clearCart:', cartItems);
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
