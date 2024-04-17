import express from 'express';
import Book from '../models/bookModel';
import Author from '../models/authorModel.js';
import Search  from '../models/searchModel.js';
import  Cart  from '../models/cartModel.js';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();
let CartItem = [];

//route for Get All books in cart
// Route to get all items in the cart
router.get('/', async (request, response) => {
  try {
      // Retrieve the cart ID from the session or request parameters
      const cart = await Cart.getCartBySessionId(request.sessionID); 
      
      if (cart === null) {
        return response.json([]);
      }
      // Retrieve all items associated with the cart ID
      const cartItems = await Cart.getCartItems(cart.id);

      // Respond with the cart items
      response.json(cartItems);
  } catch (error) {
      console.error('Error fetching cart items:', error);
      response.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

//route to add item to cart
router.post('', async (request, respond) => {
    console.log('inside the addtocart route');
    console.log('here is the sessiion id at route entrance',request.sessionID);
   try {
    const { book_id, quantity, cost } = request.body;


    //Get existing cart
    let cart = await Cart.getCartBySessionId(request.sessionID);
    console.log('session id at existing cart ck:', request.session.id);
    
    //Create cart if it doesn't exist
    if (cart === null) {
      const cartId =  await Cart.createNewCart(request.sessionID);
      cart = { id: cartId};
      console.log('here is the cartID from newCart:', cart);
    }
    
    
    //add item to the cart 
    await Cart.addToCart(cart.id, book_id, quantity, cost);

    respond.json({ message: 'Item added to cart successfully!' });
   } catch (error) {
    console.error('Error adding item to cart:', error);
    respond.status(500).json({ error: "Failed to add item to cart" });
   }  
});
   

// Route to delete a item from shopping cart
router.delete('/:book_id', async (request, response) => {
        console.log("Delete cart by book_id route reached");
        try {
            const book_id = request.params.book_id;
            console.log("Captured ID:", book_id);
    
            //this was pointing to the book model before. Changed it to point to the cart model.                   
            const deleteResult = await Cart.deleteByID(book_id); //order_id needed to be removed for now as it was throwing an error, but can be added back when needed -bw
            console.log("Delete Result:", deleteResult); // Log the result
    
            if (deleteResult.deleted) {
                return response.status(200).send({ message: 'Book deleted successfully from cart' });
            } else {
            // Handle cases where 'deleted' might be false 
                return response.status(500).send({ message: 'Error deleting book from cart' });
        }
        } catch (error) {
            console.error(error.message);
            response.status(500).send({ message: 'Error deleting book from cart' })
        }
    })



export default router;