import { query } from 'express';
import  openDB  from '../db.js';
import Author  from './authorModel.js';

class Cart {
    async create(newCart) {
        try {
            const db = openDB(); 

            //Check if the item already exists in the cart
            const existingItem = await db.get(
                'SELECT quantity FROM Cart2 WHERE BOOK_ID =? AND order_id = ?', 
                [newCart.book_id, newCart.order_id]
            );

            if (existingItem) {
                //Item exists - update quantity
                const updatedQuantity = existingItem.quantity + newCart.quantity
            }

            // Check if inventory for book availability
            const inventoryResult = await db.get(
                'SELECT quantity FROM Inventory WHERE book_id = ?',
            );
            if(!inventoryResult || inventoryResult.quantity < newCart.quantity) {
                throw new Error ('Insufficient stock');
            }
            return new Promise ((resolve, reject) => {
                db.run("INSERT INTO Cart2 (book_id, order_id, quantity, cost) VALUES (?, ?, ?, ?)", 
                    [newCart.book_id, newCart.order_id, newCart.quantity, newCart.cost],
                    function (err) {
                        if (err) {
                            reject.apply(err);
                        } else {
                            const cart_id = this.lastID; 
                            console.log("Created Cart ID:", cart_id);
                            resolve("Cart Create");
                        }
                    }
                 );
            })
             
        } catch (err) {
            throw err; // Re-throw the error for centralized handling
        }
    }
    
    async deleteByID(book_id, order_id) {  
        const db = openDB();// Get the DB oject      
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Cart2 WHERE book_id = ?, AND order_id = ?';
            db.run(sql, [book_id, order_id], function(err) {
                if (err) {
                    reject(err); 
                } else {
                    resolve({ 
                        deleted: true, 
                        changes: this.changes 
                    }); 
                } 
            });
        });
    }

}
export default new Cart();