// db.js
import sqlite3 from 'sqlite3';
import { DATABASE } from './config.js'; 

const db = new sqlite3.Database(DATABASE, (err) => {
    if (err) {
       console.error('Error connecting to the database:', err);
    } else {
       console.log('Connected to the SQLite database');
    }
});

export default db; // Use default export for simpler import



