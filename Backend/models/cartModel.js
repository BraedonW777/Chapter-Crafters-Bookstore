import { query } from 'express';
import  openDB  from '../db.js';
import Author  from './authorModel.js';

class Cart {
    async create(newCart) {
        console.log("Insert query in cart.create", query);
        console.log("newCart Object:", newCart);
        const db = openDB();// Get the DB oject 

        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Cart2 (book_id, order_id, quantity, cost) VALUES (?, ?, ?, ?)", 
                [newCart.book_id, newCart.order_id, newCart.quantity, newCart.cost],
                function(err) { 
                    if (err) {
                       reject(err);
                   } else {
                       const cart_id = this.lastID; // Get the ID
                       console.log("Created Cart ID:", cart_id); // Log inside callback 
                       resolve("Cart Created"); 
                   }
               });
       }); 
   } 


}
export default new Cart();