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


  async find() {
    const db = openDB();
    return new Promise ((resolve, reject) => {
      const sql = 'SELECT o.*, oi.book_id, oi.quantity, oi.price, b.title FROM Orders o JOIN Order_Items oi ON o.order_id = oi.order_id JOIN Books b ON b.book_id = oi.book_id';
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const orders = this.restructureOrders(rows);
          resolve(orders);
        }
      });
    });
  }

  async restructureOrders(rows) {
    const orders = {};
    rows.forEach(row => {
      const orderId = row.order_id;
      if (!orders[orderId]) {
        orders[orderId] = {
          order_id: row.order_id,
          customer_name: row.customer_name,
          shipping_address: row.shipping_address,
          city: row.city,
          state: row.state,
          zipcode: row.zipcode,
          email: row.email,
          phone: row.phone, 
          order_date: row.order_date,
          order_status: row.order_status,
          total_price: row.total_price,

          orderItems: []     
        };
      }
      orders[orderId].orderItems.push({
        book_id: row.book_id,
        quantity: row.quantity,
        item_price: row.price,
        title: row.title
      });
    });
    return Object.values(orders);

  }

}

export default new Order();

