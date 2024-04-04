import express from "express";
import {PORT} from "./config.js";
//import { Book } from './models/bookModel';
import openDB  from './db.js';
//import { Author } from './models/authorModel.js'
import booksRoute from './Routes/booksRoute.js';
import searchRoute from './Routes/searchRoute.js';

const app = express();

//middleware used for parsing request body
app.use(express.json());

//app.get('/', (request, response) => {
    //console.log(request)
    //return response.status(200).send('Welcome to the BOOKSTORE');

//});

app.use('/books', booksRoute);
app.use('/search', searchRoute);

//Error Handling Midddleware 
app.use((err, request, response, next) => {
    console.error(err.stake);
    response.status(500).send({ message: 'Something went Wrong!'});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



