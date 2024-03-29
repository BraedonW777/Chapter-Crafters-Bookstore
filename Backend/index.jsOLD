import express from "express";
import {PORT} from "./config.js";
import {DATABASE} from "./config.js";
import sqlite3 from 'sqlite3';
import Book from '/models/addBookModel';


const db = new sqlite3.Database(DATABASE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the bookstore database');
    }
)

const app = express();

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the BOOKSTORE');

});
const Book = require('./model/bookModel');

//Route to Add a new Book
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.isbn
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, ISBN',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            ISBN: request.body.ISBN,
        };    
        
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});        
    }
});

app.listen(PORT, () => {
    console.log('App is listening to port:', PORT);

});