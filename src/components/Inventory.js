import React, { useEffect, useState } from 'react';
import axios from 'axios'; //had to install axios for API requests. 

const Inventory = () => {
  const [books, setBooks] = useState([]); //'books' will hold the list of books fetched from the backend server

  useEffect(() => { //attempt to fetch books from backend server
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books'); // have to run the backend with 'node .\Backend\index.js' in terminal. This adds bookstore.db to the root files, but for some reason it is empty after its added.
        //because the bookstore.db is empty, it always logs "SQLITE_ERROR: no such table: Books" when navigating to the products page. 
        setBooks(response.data.data); //sets the var books to the data retrieved from the backend. 
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };    

    fetchBooks();
  }, []);
//produce the output for the page. Titles the page Iventory then lists all the books found. Will have to update schema and figure out images for books at a later time. 
  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} - {book.author_first_name} {book.author_last_name} - {book.isbn} - {book.cost} {/* Adjust this according to book schema (Can be done later after we get the import working) */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
