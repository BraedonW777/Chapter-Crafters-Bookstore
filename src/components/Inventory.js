import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; //had to install axios for API requests. 
import './Inventory.css';

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
  <div class="inventory-wrapper">  {/* New wrapper element */}
  <h1>Inventory</h1> {/* Heading outside the container */}
  <div class="inventory-container">  {/* Container for list */}
     <ul>
       {books.map(book => (
         <li key={book.book_id} className="book-container"> {/* Container for each book */}
           <div className="book-label">Title:</div>
           <div className="book-details"><Link to={`/books/${book.book_id}`}>{book.title}</Link></div>
           <div className="book-label">Author:</div>
           <div className="book-details">{book.author_fullname}</div>
           <div className="book-label">ISBN:</div>
           <div className="book-details">{book.isbn}</div>
           <div className="book-label">Cost:</div>
           <div className="book-details">{book.cost}</div>
           <div className="book-label">Stock QTY:</div>
           <div className="book-details">{book.quantity}</div> 
         </li>
       ))}
     </ul>
   </div>
</div>
);
};

export default Inventory;
