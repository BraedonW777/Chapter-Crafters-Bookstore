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
//     if (err) {
//        console.error(err.message);
//    }
//    console.log('Success');
// });
// sql = 'SELECT * FROM users';
// db.all(sql,[],(err,rows)=> {
//     if (err) {
//        console.error(err.message);
//    }
//    console.log('Success');
//     rows.forEach(row=>{
//         console.log(row);
//     });
// });

const db = new sqlite3.Database(DATABASE,sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the bookstore database');
});

// Sets variable for User Table Checking
let UsersCheck = `CREATE TABLE IF NOT EXISTS Users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  user_role ENUM('Admin', 'Customer', 'Employee') DEFAULT 'Customer'
);`;

// Sets variable for Books Table Checking
let BooksCheck = `CREATE TABLE IF NOT EXISTS Books (
  book_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) UNIQUE,
  author_id INTEGER,
  isbn VARCHAR(13) UNIQUE,
  publication_year INTEGER,
  FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);`;

// Sets variable for Authors Table Checking
let AuthorsCheck = `CREATE TABLE IF NOT EXISTS Authors (
  author_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  middle_name VARCHAR(50)
);`;

// Sets variable for Genre Table Checking
let GenreCheck = `CREATE TABLE IF NOT EXISTS Genre (
  genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) UNIQUE
);`;

// Sets variable for BookCategories Table Checking
let BookCategoriesCheck = `CREATE TABLE IF NOT EXISTS BookCategories (
  book_id INTEGER,
  genre_id INTEGER,
  PRIMARY KEY (book_id, genre_id),
  FOREIGN KEY (book_id) REFERENCES Books(book_id),
  FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);`;

// Sets variable for Inventory Table Checking
let InventoryCheck = `CREATE TABLE IF NOT EXISTS Inventory (
  inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER,
  rarity VARCHAR(25),
  edition VARCHAR(25),
  cost INTEGER,
  price INTEGER,
  item_state ENUM('in_stock', 'cart_reserved', 'damaged', 'order_pick', 'sold_shipped', 'sold_fulfilled'),
  FOREIGN KEY (book_id) REFERENCES Books(book_id)
);`;

// Sets variable for Cart Table Checking
let CartCheck = `CREATE TABLE IF NOT EXISTS Cart (
  cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  book_id INTEGER,
  quantitiy INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (book_id) REFERENCES Books(book_id)
);`;

// Build and or check database tables
// serialize allows multiple actions on the database in series. Errors will be logged.
db.serialize(() => {
  // Users table
  db.run(UsersCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Users Table');
  });

  // Books table
  db.run(BooksCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Books Table');
  });

  // Authors table
  db.run(AuthorsCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Authors Table');
  });

  // Genre table
  db.run(GenreCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Genre Table');
  });

  // Book_Categories table (composite primary key)
  db.run(BookCategoriesCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Book_Categories Table');
  });

  // Inventory Tracking table
  db.run(InventoryCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Inventory Table');
  });

  // Cart table
  db.run(CartCheck,(err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Created Cart Table');
  });

  console.log('Tables created (if not already existed)');
});

db.close();

// Functions to Insert data into tables

// functions to UPDATE data into tables

// Functions to 