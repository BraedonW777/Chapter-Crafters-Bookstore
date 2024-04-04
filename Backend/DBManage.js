// Work in progress
// move TablesCreate under !dbExists statement
// Integrate information_schema.tables and information_schema.columns and datatypes checkinginto dbExists statement


// Reference: https://dev.to/simonmackie/a-comprehensive-guide-to-using-sqlite-with-nodejs-549i
// Create the database connection example: const sqlite3 = require('sqlite3').verbose();const db = new sqlite3.Database('mydatabase.db');
// Connection allows CRUD
// Basic query example: db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
// Other query methods: 
// db.all("SELECT * FROM users", (err, rows) => {  if (err) {    console.error(err);  } else {    console.log(rows);  }});
// db.serialize(() => {  db.run("BEGIN TRANSACTION");  db.run("INSERT INTO users (name) VALUES ('John')");  db.run("INSERT INTO users (name) VALUES ('Jane')");  db.run("COMMIT");});
// Prepare Statements Syntax: const statement = db.prepare("INSERT INTO users (name) VALUES (?)");statement.run("John");statement.run("Jane");statement.finalize();
// 
import db from './db.js';
import {PORT} from "./config.js";


const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

databaseValidate.exports = {
  createTables: ('./bookstore.db') => {
    const dbExists = existsSync('./bookstore.db'); // Check for file existence

    if (!dbExists) { // If the database does not exist
      const db = new sqlite3.Database('./bookstore.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => { // Create the database file
        if (err) {
          console.error('Error creating database:', err.message);
        } else {
          console.log('Created bookstore database');
        } 
    });
    },
    
    if (dbExists) {
      function validateTableName(Users) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(Users);
      }
      function validateTableName(Books) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(Books);
      }
      function validateTableName(Authors) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(Authors);
      }
      function validateTableName(Genre) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(Genre);
      }
      function validateTableName(BookCategories) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(BookCategories);
      }
      function validateTableName(Inventory) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(Inventory);
      }
      function validateTableName(Cart) {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Allow alphanumeric characters and underscores
        return regex.test(Cart);
      }
    }else {
      console.log('Database already exists');
    }
    db.close(); //Close connestion after creation
    };


    const db = new sqlite3.Database('./bookstore.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the bookstore database');
      }
    });

    const TablesCreate = {
      // Sets variable for User Table Checking
      Users: `CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE,
        password_hash VARCHAR(255),
        user_role ENUM('Admin', 'Customer', 'Employee') DEFAULT 'Customer'
      );`,

      // Sets variable for Books Table Checking
      Books: `CREATE TABLE IF NOT EXISTS Books (
        book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) UNIQUE,
        author_id INTEGER,
        isbn VARCHAR(13) UNIQUE,
        publication_year INTEGER,
        FOREIGN KEY (author_id) REFERENCES Authors(author_id)
      );`,

      // Sets variable for Authors Table Checking
      Authors: `CREATE TABLE IF NOT EXISTS Authors (
        author_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        middle_name VARCHAR(50)
      );`,

      // Sets variable for Genre Table Checking
      Genre: `CREATE TABLE IF NOT EXISTS Genre (
        genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) UNIQUE
      );`,

      // Sets variable for BookCategories Table Checking
      BookCategories: `CREATE TABLE IF NOT EXISTS BookCategories (
        book_id INTEGER,
        genre_id INTEGER,
        PRIMARY KEY (book_id, genre_id),
        FOREIGN KEY (book_id) REFERENCES Books(book_id),
        FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
      );`,

      // Sets variable for Inventory Table Checking
      Inventory: `CREATE TABLE IF NOT EXISTS Inventory (
        inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        rarity VARCHAR(25),
        edition VARCHAR(25),
        cost INTEGER,
        price INTEGER,
        item_state ENUM('in_stock', 'cart_reserved', 'damaged', 'order_pick', 'sold_shipped', 'sold_fulfilled'),
        FOREIGN KEY (book_id) REFERENCES Books(book_id)
      );`,

      // Sets variable for Cart Table Checking
      Cart: `CREATE TABLE IF NOT EXISTS Cart (
        cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        book_id INTEGER,
        quantitiy INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (book_id) REFERENCES Books(book_id)
      );`,
    };

    db.serialize(() => {
      try {
        // Create tables sequentially
        for (const Users in TablesCreate) {
          db.run(TablesCreate[Users]);
          console.log(`Confirmed ${Users} table`);
        }
        console.log('Tables created (if not already existed)');
        for (const Books in TablesCreate) {
          db.run(TablesCreate[Books]);
          console.log(`Confirmed ${Books} table`);
        }
        console.log('Tables created (if not already existed)');
        for (const Authors in TablesCreate) {
          db.run(TablesCreate[Authors]);
          console.log(`Confirmed ${Authors} table`);
        }
        console.log('Tables created (if not already existed)');
        for (const Genre in TablesCreate) {
          db.run(TablesCreate[Genre]);
          console.log(`Confirmed ${Genre} table`);
        }
        console.log('Tables created (if not already existed)');
        for (const BookCategories in TablesCreate) {
          db.run(TablesCreate[BookCategories]);
          console.log(`Confirmed ${BookCategories} table`);
        }
        console.log('Tables created (if not already existed)');
        for (const Inventory in TablesCreate) {
          db.run(TablesCreate[Inventory]);
          console.log(`Confirmed ${Inventory} table`);
        }
        console.log('Tables created (if not already existed)');
        for (const Cart in TablesCreate) {
          db.run(TablesCreate[Cart]);
          console.log(`Confirmed ${Cart} table`);
        }
        console.log('Tables created (if not already existed)');
      } catch (error) {
        console.error('Error creating tables:', error.message);
      } finally {
        db.close();
      }
    });
  }
};


// Modules to Insert data into tables

// Modules to UPDATE data into tables

// Modules to delete data from tables
