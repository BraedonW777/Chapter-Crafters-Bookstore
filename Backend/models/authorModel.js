//authorModel.js
import db from '../db.js';

//console.log("Inside authorModel.js");

class Author {
    static async create(newAuthor) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Authors (first_name, last_name) Values (?, ?)", [newAuthor.first_name, newAuthor.last_name], function(err) { 
               if (err) {
                    reject(err);
                } else {
                    const authorId = this.lastID; // Store the ID
                    resolve(authorId);          // Resolve with the authorId
                }
            }); 
        });
    }
}


export { Author };
