import {DATABASE} from "./config.js";


const sqlite3 = require('sqlite3').verbose();



// let sql;
// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)';
// db.run(sql);

// DROP Table
// db.run('Drop Table users')

// Insert Data into Table
// sql = 'INSERT INTO users(first_name,last_name,username,password,email) Values (?,?,?,?,?)';
// db.run(sql,["TESTfirstNameVariable","TESTlastNameVariable","TESTusernameVariable","TESTpasswordVariable","TESTemailVariable@email.com"],(err)=>{
//     if (err) return console.error(err.message);
// });
// sql = 'SELECT * FROM users';
// db.all(sql,[],(err,rows)=> {
//     if (err) return console.error(err.message);
//     rows.forEach(row=>{
//         console.log(row);
//     });
// });

const db = new sqlite3.Database(DATABASE. sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// Build and or check database tables

db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE,
      email VARCHAR(100) UNIQUE,
      password_hash VARCHAR(255),
      user_role ENUM('Admin', 'Customer', 'Employee') DEFAULT 'Customer'
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  // Books table
  db.run(`
    CREATE TABLE IF NOT EXISTS Books (
      book_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) UNIQUE,
      author_id INTEGER,
      isbn VARCHAR(13) UNIQUE,
      publication_year INTEGER,
      FOREIGN KEY (author_id) REFERENCES Authors(author_id)
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  // Authors table
  db.run(`
    CREATE TABLE IF NOT EXISTS Authors (
      author_id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      middle_name VARCHAR(50)
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  // Genre table
  db.run(`
    CREATE TABLE IF NOT EXISTS Genre (
      genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) UNIQUE
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  // Book_Categories table (composite primary key)
  db.run(`
    CREATE TABLE IF NOT EXISTS Book_Categories (
      book_id INTEGER,
      genre_id INTEGER,
      PRIMARY KEY (book_id, genre_id),
      FOREIGN KEY (book_id) REFERENCES Books(book_id),
      FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  // Inventory Tracking table
  db.run(`
    CREATE TABLE IF NOT EXISTS Inventory (
      inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER,
      rarity VARCHAR(25),
      edition VARCHAR(25),
      cost INTEGER,
      price INTEGER,
      item_state ENUM('in_stock', 'cart_reserved', 'damaged', 'order_pick', 'sold_shipped', 'sold_fulfilled'),
      FOREIGN KEY (book_id) REFERENCES Books(book_id)
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  // Cart table
  db.run(`
    CREATE TABLE IF NOT EXISTS Cart (
      cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      book_id INTEGER,
      quantitiy INTEGER,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (book_id) REFERENCES Books(book_id)
    );
  `,(err)=>{
    if (err) return console.error(err.message);
  });

  console.log('Tables created (if not already existed)');
});

db.close();

// Functions to Insert data into tables

// functions to UPDATE data into tables

// Functions to 