import { query } from 'express';
import  openDB  from '../db.js';



class Order {
  async createOrder(orderData) {
    try {
      const db = await openDB(); 

      const orderId = await new Promise((resolve, reject) => {
        db.run(`INSERT INTO orders (customer_name, email, phone, shipping_address, city, state, zipcode, total_price) 
                VALUES (?, ?, ?, COALESCE(?, ''), ?, ?, ?, ?)`, 
               [
                 orderData.fullName,
                 orderData.email,
                 orderData.phone,
                 orderData.addressLine1 + ' ' + orderData.addressLine2,
                 orderData.city,
                 orderData.state,
                 orderData.zipCode,
                 orderData.total
               ], 
               function(err) {
                 if (err) {
                   reject(err); 
                 } else {
                   resolve(this.lastID); 
                 }
               });
      });

      for (const item of orderData.items) {
        await db.run(`INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)`, 
                     [orderId, item.book_id, item.quantity, item.price]); 
      }

      return orderId; 
    } catch (error) {
      throw error; 
    }
  }
}

export default new Order();

