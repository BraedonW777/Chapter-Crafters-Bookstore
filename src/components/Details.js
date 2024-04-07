import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Details = ({ match }) => {
  const [book, setBook] = useState(null);
  const { id } = useParams(); //access route paramater directly
//using the same meathod from the inventory page.
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`); // Fetch book details from the server using Axios
        setBook(response.data);
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);// Include id in the dependency array to re-run the effect when id changes

  // Render book details if available, or a loading message if not
  return (
    <div>
      <h2>Book Details</h2>
      {book ? ( // Check if book details are available
        <div>
          <p>Title: {book.title}</p>
          <p>Author: {book.author_fullname}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Edition: {book.edition}</p>
          <p>Cost: {book.cost}</p> 
          {/* Since the inventory is rare books, that makes each product have to be defined a different price due to rarity. 
          This means we need to pull an index of the book IDs from the Inventory Table and list the cost from a sorted rarity and uniquenes. 
          It would also be imperative to display the books.summary, inventory.rarity, inventory.edition, and inventory.uniqueSummary. Mtillman*/}

          {/* Add additional book details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
