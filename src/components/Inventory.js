import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; //had to install axios for API requests. 

const Inventory = () => {
  const [books, setBooks] = useState([]); //'books' will hold the list of books fetched from the backend server

  useEffect(() => { //attempt to fetch books from backend server
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books'); // have to run the backend with 'node .\Backend\index.js' in terminal. 
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
          <li key={book.book_id}>
            <Link to={`/books/${book.book_id}`}>{book.title}</Link> - {book.author_fullname} - {book.isbn} - {book.cost} {/* Adjust this according to book schema (Can be done later after we get the import working) */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
