import { query } from 'express';
import  openDB  from '../db.js';
import Author  from './authorModel.js';


class Cart {
    
    //Create new Cart
    async createNewCart(sessionId) {
        console.log('inside createNewCart',sessionId);
        const sql = 'INSERT INTO Cart (session_id) VALUES (?)';
        const db = openDB();
        return new Promise((resolve, reject) => {
            db.run(sql, [sessionId], function (err) {
            if (err) {
                reject(err);
            } else {
                const id = this.lastID
                console.log('Created new cart:', id);
                resolve(id); //retrieve cart ID
                
            }    
        });
        });
    }
    
    //Get cart by session ID
    async  getCartBySessionId(sessionId) {
        console.log('inside getcartBySessionID', sessionId);
        const sql = 'SELECT * FROM Cart WHERE session_id = ?';
        const db = openDB();
        return new Promise((resolve, reject) => {
            db.get(sql, [sessionId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    console.log('Cart exists:', row);
                    const id = this.lastID;
                    resolve (row);
                } else {
                    console.log('Cart does not exist');
                    resolve(null);
                }
            }
            })
        })
    }
    //Add item to cart
    async addToCart(cartId, book_id, quantity, cost) {
        //const sql = 'INSERT INTO Cart_Items (cart_id, book_id, quantity, price) VALUES (?, ?, ?, ?)';
        const db = openDB();
        const existingCartItem = await this.getCartItem(cartId, book_id);

        if (existingCartItem) {
            //if the item alrady exists in the cart, update quantity
            const newQuantity = existingCartItem.quantity + quantity;
            const sql = 'UPDATE Cart_Items SET quantity = ? WHERE cart_id = ? and book_id = ?';
            return new Promise((resolve, reject) => {
                db.run(sql, [newQuantity, cartId, book_id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    } else { 
            //If item doesn't exist insert new row in db 
            const sql = 'INSERT INTO Cart_Items (cart_id, book_id, quantity, price) VALUES (?, ?, ?, ?)';
            
            return new Promise((resolve, reject) => {
                db.run(sql, [cartId, book_id, quantity, cost], function(err) {
                    if (err) {
                        reject(err);
                    }else {
                        resolve();
                    }
                });
            });

        }

        
    
        return new Promise((resolve, reject) => {
            db.run(sql, [cartId, book_id, quantity, cost],function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(); 
                    }
                }
            )
        })
    }
    //Function to check if a book is already in the cart 
    async getCartItem(cartId, book_id) {
        const db = openDB();
        const sql = 'SELECT * FROM Cart_Items WHERE cart_id = ? AND book_id = ?';
        return new Promise((resolve, reject) => {
            db.get(sql, [cartId, book_id], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row,);
                    console.log('Book exists in cart', row);
                }
            });
        });
    }
    //displaying all cart times 
    async getCartItems(cartId) {
        const db = openDB();
        const sql = 'SELECT cart_items.*, Books.title, Authors.first_name, Authors.last_name FROM cart_items JOIN Books ON cart_items.book_id = Books.book_id JOIN Authors ON Books.author_id = Authors.author_id WHERE cart_items.cart_id = ?';
        return new Promise((resolve, reject) => {
            db.all(sql, [cartId,], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row,);
                    console.log('Cart Items:', row);
                }
            });
        });
    }

    //added this funtion to get the remove button from the cart working
    //just copied the deleteByIsbn function
    //the cart route calls to this function but it did not exist yet. 
    async deleteByID(book_id) {  
        const db = openDB();// Get the DB oject      
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM cart_items WHERE cart_id = ?';
            db.run(sql, [book_id], function(err) {
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

    //delete cart by cartID
    async deleteCart(cartId) {
        console.log('after order is submitted, here is the cartID:', cartId);
        const db = openDB();
    
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('DELETE FROM Cart_Items WHERE cart_id = ?', cartId, (err) => {
                    if (err) return reject(err);
                    
                    db.run('DELETE FROM Cart WHERE id = ?', cartId, (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            });
        });
    }

}
export default new Cart();