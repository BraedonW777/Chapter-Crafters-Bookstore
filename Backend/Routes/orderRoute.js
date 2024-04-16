import express from 'express';
import Order from '../models/orderModel.js';

const router = express.Router();

//POST for adding orders to 
router.post('', async (request, response) => {
    console.log("orderRoute reached");
    try {
        const { fullName, email, phone, addressLine1, addressLine2, city, state, zipCode, items, total} = request.body;
        const orderId = await Order.createOrder({fullName, email, phone, addressLine1, addressLine2, city, state, zipCode, items, total});
        response.status(201).json({ message: 'Order created', orderId});
    } catch (error) {
        response.status(500).json({ error: error.message });
    }


});

//Get for getting all orders to display in order link
router.get('', async (request, response) => {
    try {
        const order = await Order.find({});

        const structure = {
            count: order.length,
            data: order
        };

        return response.status(202).json(structure);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;