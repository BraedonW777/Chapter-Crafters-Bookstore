/*
Mtillman
Work in progress
move TablesCreate under !dbExists statement
Integrate information_schema.tables and information_schema.columns and datatypes checkinginto dbExists statement


Reference: https://dev.to/simonmackie/a-comprehensive-guide-to-using-sqlite-with-nodejs-549i
Create the database connection example: const sqlite3 = require('sqlite3').verbose();const db = new sqlite3.Database('mydatabase.db');
Connection allows CRUD
Basic query example: db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
Other query methods: 
db.all("SELECT * FROM users", (err, rows) => {  if (err) {    console.error(err);  } else {    console.log(rows);  }});
db.serialize(() => {  db.run("BEGIN TRANSACTION");  db.run("INSERT INTO users (name) VALUES ('John')");  db.run("INSERT INTO users (name) VALUES ('Jane')");  db.run("COMMIT");});
Prepare Statements Syntax: const statement = db.prepare("INSERT INTO users (name) VALUES (?)");statement.run("John");statement.run("Jane");statement.finalize();
**** With Prepare statement, only one search call needed for all searches. it would need a translation on the front end for searches that do not dirrectly access the books table such as genre or author. 
therefore, needing a second call once Books(book_id) is returned.

https://stackoverflow.com/questions/62743570/using-es6-modules-in-express
With node.js, you HAVE to tell it that your main file you are loading is an ESM module. There are a couple ways to do that. The simplest is to just give the main file a .mjs file extension.
app.mjs
import express from 'express';
const app = express();
app.get("/", (req, res) => {
    res.send("hello");
});

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
required 'require funciton'
const express = require("express");
const app = express();
Functions below are export syntax for multiple paths for perimeter and area of a square funtion.
exports.area = function (width) {
  return width * width;
};
exports.perimeter = function (width) {
  return 4 * width;
};
Import Module using require funciton:
const square = require("./square"); // Here we require() the name of the file without the (optional) .js file extension
console.log(`The area of a square with a width of 4 is ${square.area(4)}`);
Note: You can also specify an absolute path to the module (or a name, as we did initially).
If you want to export a complete object in one assignment instead of building it one property at a time, 
assign it to module.exports as shown below (you can also do this to make the root of the exports object a constructor or other function):
module.exports = {
  area(width) {
    return width * width;
  },

  perimeter(width) {
    return 4 * width;
  },
};


Session ID example: 
https://stackoverflow.com/questions/9291548/how-can-i-find-the-session-id-when-using-express-connect-and-a-session-store
For recent readers;
Connect middlewares are not included in Express since version 4.
So in order to have req.sessionID work you must do following:
Make sure you have cookie-parser abd express-session modules inside your package.json. If it's not added, add them:

npm install express-session --save
npm install cookie-parser --save

Be careful about the order while requiring them in your app.js file and add required configuration parameters.

var cookieParser = require('cookie-parser');
var session = require('express-session')
app.use(cookieParser());
app.use(session({
  secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
  resave: false,
  saveUninitialized: true
 }));

Now you should be using req.sessionID and req.session.id.

Store the SID with the account, when the user logs in during the database validation of the user account call .destroy(sid, fn), then update the SID in the database with the current SID of the user.

In my case using MongoDB this is how i've done it:

app.post('/login', function(req, res)
{
  var sid = req.sessionID;
  var username = req.body.user;
  var password = req.body.pass;

  users.findOne({username : username, password : password}, function(err, result)
  { 
    ...
    sessionStore.destroy(result.session, function(){
       ...
       users.update({_id: result._id}, {$set:{"session" : sid}});
       ...
    }
    ...
  }
}
*/





app.listen(80);


const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

exports.databaseValidate = {
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
      function validateTableName(Orders) {
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
      // Sets variable for Orders Table Checking
      Orders: `CREATE TABLE IF NOT EXISTS Orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER UNIQUE,
        email VARCHAR(100),
        Fname VARCHAR(255),
			  Lname VA4CHAR(255),
				AddrLine1 VARCHAR(255),
				AddrLine2 VRCHAR(255),
				AddrCity VARCHAR(255),
        AddrState ENUM('CHOOSE STATE', 'ADD LIST') DEFAULT 'CHOOSE STATE',
				AddrZip1 INTEGER(5),
				AddrZip2 INTEGER(4),
				Status ENUM('Processing', 'Confirmed', 'Fulfilling', 'Shipped', 'Delivered', 'Cancelled'),
				PRIMARY KEY order_id AUTOINCREMENT,
				FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
      );`,

      // Sets variable for Books Table Checking
      Books: `CREATE TABLE IF NOT EXISTS Books (
        book_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) UNIQUE,
        author_id INTEGER,
        isbn VARCHAR(13) UNIQUE,
        publication_year INTEGER,
        description VARCHAR(255),
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
        genreName VARCHAR(50) UNIQUE
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
        uniqueSummary VARCHAR(255),
        item_state ENUM('in_stock', 'cart_reserved', 'damaged', 'order_pick', 'sold_shipped', 'sold_fulfilled'),
        FOREIGN KEY (book_id) REFERENCES Books(book_id)
      );`,

      Users: `CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY,
        cart_id INTEGER,
      );`,
      // Sets variable for Cart Table Checking
      // user_cart_line is a composite number concantonated from Users(user_id)+Cart(cart_id)+'cart item line'
      Cart: `CREATE TABLE IF NOT EXISTS Cart (
        cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_cart_line INTEGER,
        inventory_id INTEGER,
				timeAdded TIMESTAMP,
				timeRemoved TIMESTAMP,
        FOREIGN KEY (inventory_id) REFERENCES Inventory(inventory_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
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

// Above code will be migrated to ./models/databasecreation
// date and time of migration: 


// Modules to Insert data into tables

// Modules to UPDATE data into tables

// Modules to delete data from tables
