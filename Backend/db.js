// db.js
import sqlite3 from 'sqlite3';
import { DATABASE } from './config.js'; 

function openDB() {
   console.log('Attempting to open database');
   return new sqlite3.Database(DATABASE, (err) => {
      if (err) {
         console.error('Error Connecting to database', err);
      } else {
         console.log('Connected to the SQLite database')
      }
   })
}


export default openDB; 



