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
import orderRoute from './Routes/orderRoute.js';

const app = express();

//creating the secret string 
const secret = uuidv4();

//Session Configuration
app.use(session({
    secret: secret,
    resave: true, //these need to be set to true for cookies to be past
    saveUninitialized: true, //this needs to be set to true for cookies to passed with request 
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null 
    }   
}));

app.use((request, response, next) => {
    console.log('Session ID:', request.sessionID);
    next();
})
//middleware used for parsing request body
app.use(express.json());

//used for Cross-Site origins
app.use(cors({
    origin: 'http://localhost:3001', //frontend origin
    credentials: true //needed for sending cookies on local host
}));

app.use('/books', booksRoute);
app.use('/search', searchRoute);
app.use('/addToCart', cartRoute);
app.use('/addOrder', orderRoute);
app.use('/search', searchRoute);

//Error Handling Midddleware 
app.use((err, request, response, next) => {
    console.error(err.stake);
    response.status(500).send({ message: 'Something went Wrong!'});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



