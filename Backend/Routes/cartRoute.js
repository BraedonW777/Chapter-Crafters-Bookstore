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
    console.log('bookid:', request.body.book_id);

    //get info from frontend object
    const book_id = request.body.book_id;
    const quantity = request.body.quantity;
    const cost = request.body.cost;
       
    //Get or Generate unique order ID if it doesn't exist in the session
    if (!request.sessionID.order_id) {
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
        await Cart.create(newCart);
        respond.status(200).send('Item add to cart');
    } catch (err) {
        console.error('Error adding to cart:', err);
        respond.status(500).send('Error adding to cart');        
    }
    

});

export default router;