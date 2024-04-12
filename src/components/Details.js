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

  //Add to Cart addition made by Lyndsey
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartFeedback, setCartFeedback] = useState(''); // For feedback messages


  useEffect(() => {
    const storedCount = sessionStorage.getItem('cartCount');
    setCartCount(storedCount? parseInt(storedCount, 10) : 0);
  }, []);

  const handleAddToCart = async () => {
      try {
          console.log(book.book_id);

          const response = await axios.post('http://localhost:3000/addToCart', {
              book_id: book.book_id,
              quantity: quantity,
              cost: book.cost, 
          }, { withCredentials: true});
          console.log(response.data);

          //setCartCount(cartCount + quantity); // Update the cart count
          setCartCount(cartCount + quantity);
          sessionStorage.setItem('cartCount', cartCount + quantity);
          setCartFeedback('Item added to cart!');

      } catch (error) {
          console.error('Error adding to cart:', error);
          setCartFeedback('Error adding to cart. Please try again.'); 
      } finally {
          // Optional: Clear feedback after a short timeout
          setTimeout(() => setCartFeedback(''), 30000); 
      }
  };


  // Render book details if available, or a loading message if not
  return (
    <div>
      <h2>Book Details</h2>
      {book ? ( // Check if book details are available
        <div>
          <p>Title: {book.title}</p>
          <p>Author: {book.author_fullName}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Book ID: {book.book_id}</p>
          <p>Edition: {book.edition}</p>
          <p>Cost: {book.cost}</p> 
          <p>Genre: {book.category}</p> 
          {/* Since the inventory is rare books, that makes each product have to be defined a different price due to rarity. 
          This means we need to pull an index of the book IDs from the Inventory Table and list the cost from a sorted rarity and uniquenes. 
          It would also be imperative to display the books.summary, inventory.rarity, inventory.edition, and inventory.uniqueSummary. Mtillman*/}

          {/* I addded the below input stuff as well-for the click and the quantity */}
          <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          />
          <button onClick={handleAddToCart}>
            Add to Cart ({cartCount}) {/*Display cart Count*/}
          </button>
          {cartFeedback && <p>{cartFeedback}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
