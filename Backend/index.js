import express from "express";
import {PORT} from "./config.js";
import { Book } from './models/bookModel';
import db from './db.js';
import { Author } from './models/authorModel.js'

const app = express();

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the BOOKSTORE');

});



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

//middleware used for parsing request body
app.use(express.json());

//Route to Add a new Book
app.post('/books', async (request, response) => {
    try {
        //console.log('Request Body:', request.body); //logging
        //console.log("ISBN from request:", request.body.isbn);
        let missingFields = [];
        if(!request.body.title) { missingFields.push('title'); }
        if(!request.body.author_first_name) { missingFields.push('author_first_name'); }
        if(!request.body.author_last_name) { missingFields.push('author_last_name'); }
        if (!request.body.isbn) { missingFields.push('isbn'); }
        if (!request.body.cost) { missingFields.push('cost'); }

        if (missingFields.length > 0) {
            return response.status(400).send({
                message: 'Send all required fields: ${missingFields.join(',});
        }
        const authorFirstName = request.body.author_first_name;
        const authorLastName = request.body.author_last_name;
        const bookTitle = request.body.title;
        const bookIsbn = request.body.isbn;
        const bookEdition = request.body.edition;
        const bookCost = request.body.cost;

        console.log("authorFirstname:", authorFirstName);
        console.log("authorLastName:", authorLastName);

        const newAuthor = await Author.create({
            first_name: authorFirstName,
            last_name: authorLastName
        })
        console.log("Created author", newAuthor);
        console.log("Author_id before book creation", newAuthor);//finding issue 

        const newBook = {
            title: bookTitle,
            author_id: newAuthor,
            isbn: bookIsbn,
            edition: bookEdition,
            cost: bookCost,
            };    
        
        //checking if book exists by ISBN number
        let existingBook = await Book.findByIsbn(request.body.isbn);
        //const existingBook = await Book.findByIsbn(request.body.isbn);
        if (existingBook) {
            return response.status(409).send({message: 'A book with that ISBN # already exists'})
        }

        // if book doesn't exist, proceed with creation
        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});        
    }
});
//route for testing 
app.get('/test', (request, response) => {
    console.log("Inside /test route");
    return response.status(200).send("Test route working!");
});

//route for Get One books from Database by ID
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findByID(id);
        return response.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});        
    }
})

//route for Get All books from Database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        console.log("Books from Book.find():", books); // logging the output 
        //return a structure
        return response.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});        
    }
})

