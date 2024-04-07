import express from "express";
import cors from "cors";
import {PORT} from "./config.js";
//import { Book } from './models/bookModel';
import openDB  from './db.js';
//import { Author } from './models/authorModel.js'
import booksRoute from './Routes/booksRoute.js';
import searchRoute from './Routes/searchRoute.js';
import session from 'express-session';
import cartRoute from './Routes/cartRoute.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
//creating the secret string 
const secret = uuidv4();

//Session Configuration
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookies: {
        httpOnly: true,
        secure: true,
        maxAge: 360000,
        name: 'bookshop_sid'
    }
}))

//middleware used for parsing request body
app.use(express.json());
app.use(cors());


app.use('/books', booksRoute);
app.use('/search', searchRoute);
app.use('/addToCart', cartRoute);

//Error Handling Midddleware 
app.use((err, request, response, next) => {
    console.error(err.stake);
    response.status(500).send({ message: 'Something went Wrong!'});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



