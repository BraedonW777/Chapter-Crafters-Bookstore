import { query } from 'express';
import openDB from '../db.js';
import Author from './authorModel.js';

 
class Search {
    async searchByTitle(searchTerm) { 
        return new Promise((resolve, reject) => {
            const dbConnection = openDB();
            const sql = `SELECT b.*, CONCAT(a.first_name, ' ', a.last_name) AS author_name, g.category AS genre
                         FROM inventory i
                         JOIN books b ON i.book_id = b.book_id
                         JOIN authors a ON b.author_id = a.author_id
                         JOIN genre g ON b.genre_id = g.genre_id
                         WHERE b.title LIKE ?`;
      
            dbConnection.all(sql, ['%' + searchTerm + '%'], (err, rows) => {
              dbConnection.close();
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });
        });
    }

    async searchByGenre(searchGenre) {
        return new Promise((resolve, reject) => {
          const dbConnection = openDB();
          const sql = `SELECT b.title, 
                              CONCAT(a.first_name, ' ', a.last_name) AS author_fullname,
                              g.category AS genre, 
                              i.quantity 
                       FROM Books b
                       JOIN Genre g ON b.genre_id = g.genre_id
                       JOIN Authors a ON b.author_id = a.author_id
                       JOIN Inventory i ON b.book_id = i.book_id
                       WHERE g.category LIKE ?`;
      
          dbConnection.all(sql, ['%' + searchGenre + '%'], (err, rows) => {
            dbConnection.close();
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      async searchByAuthor(searchAuthor) {
        console.log("Search Author Input:", searchAuthor);
        if(!searchAuthor) {
          console.log("searchAuthor is undefined");
          return;
        }
        
        const firstName = searchAuthor.split(' ')[0];
        const lastName = searchAuthor.split(' ')[1];

        return new Promise((resolve, reject) => {
          const dbConnection = openDB();
          const sql = `SELECT b.title, 
                              CONCAT(a.first_name, ' ', a.last_name) As author_fullname,
                              g.category AS genre, 
                              i.quantity 
                       FROM Books b
                       JOIN Genre g ON b.genre_id = g.genre_id
                       JOIN Authors a ON b.author_id = a.author_id
                       JOIN Inventory i ON b.book_id = i.book_id
                       WHERE a.first_name Like ? or a.last_name like ?`;
      
          dbConnection.all(sql, ['%' + firstName + '%','%' + lastName + '%' ], (err, rows) => {
            dbConnection.close();
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }

}
//export { Search }
export default new Search();