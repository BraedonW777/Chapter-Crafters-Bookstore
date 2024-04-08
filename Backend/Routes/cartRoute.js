import express from 'express';
import Book from '../models/bookModel';
import Author from '../models/authorModel.js';
import Search  from '../models/searchModel.js';
import  Cart  from '../models/cartModel.js';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

router.post('', async (request, respond) => {
    console.log('inside the addtocart route');
    console.log('what is requested from the front:', request.body);  
    
    //get info from frontend object
    const book_id = request.body.book_id;
    const quantity = request.body.quantity;
    const cost = request.body.cost;
       
    //Get or Generate unique order ID if it doesn't exist in the session
    if (!request.sessionID.order_id) {
        console.log('Session_id: ', request.session);
        request.session.order_id = uuidv4();
    }
    const order_id = request.session.order_id;

    //Input Validation 
    if (!book_id || !quantity || !cost) {
        return respond.status(400).send( 'Missing book_id,  quantity, or cost' );
    }

    const newCart = {
        book_id: book_id,
        order_id: request.session.order_id,
        quantity: quantity,
        cost: cost
    };        

    //Call the cart mdoel to add the item 
    try {
        //call the cart Model with inventory check
        await Cart.create(newCart);
        respond.status(200).send('Item add to cart');
    } catch (err) {
        if (err.message === 'Insufficient stock') {
            respond.status(400).json({ error: 'Insufficient stock' });
        }
        else {
            console.error('Error adding to cart:', err);
            respond.status(500).json({ error: 'Internal server error' });
        }       
    }

// Route to delete a item from shopping cart
router.delete('/:book_id', async (request, response) => {
        console.log("Delete cart by book_id route reached");
        try {
            const book_id = request.params.book_id;
            console.log("Captured ISBN:", book_id);
    
                              
            const deleteResult = await Book.deleteByID(book_id, order_id); 
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

});

export default router;