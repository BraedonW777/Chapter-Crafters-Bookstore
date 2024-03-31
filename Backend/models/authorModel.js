//authorModel.js
import db from '../db.js';

console.log("Inside authorModel.js");

class Author {
    static async create(newAuthor) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Authors (first_name, last_name) Values (?, ?)", [newAuthor.first_name, newAuthor.last_name], function(err) { 
               if (err) {
                    reject(err);
                } else {
                    const author_id = this.lastID; // Store the ID
                    resolve(author_id);          // Resolve with the authorId
                }
            }); 
        });
    }

    static async findByNames(firstName, lastName) {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM Authors WHERE first_name = ? AND last_name = ?';
          db.get(sql, [firstName, lastName], (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row); // Resolve with the row if found, otherwise undefined
            }
          });
        });  
    }
}


export { Author };
