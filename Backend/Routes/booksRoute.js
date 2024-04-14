import express from 'express';
import Book from '../models/bookModel';
import Author from '../models/authorModel.js';

const router = express.Router();

console.log("In booksRoute");


//route for Get All books from Database
router.get('', async (request, response) => {
    console.log("Inside get/books");
    try {
        const books = await Book.find({});
        //console.log("Books from Book.find():", books); // logging the output 
        
        //Create a response structure
        const structure = {
            count: books.length,
            data: books
        };

        //Return the structured response
        return response.status(200).json(structure);
                
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});        
    }
})

//route for Get One books from Database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findByID(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});     
    }
})

//Route to Add a new Book 
router.post('', async (request, response) => {
    console.log('inside post route');
    console.log('title:', request.body.title);
    console.log('authorfname:', request.body.author_first_name);

    try {
        let missingFields = [];
        if(!request.body.title) { missingFields.push('title'); }
        if(!request.body.author_first_name) { missingFields.push('author_first_name'); }
        if(!request.body.author_last_name) { missingFields.push('author_last_name'); }
        if (!request.body.isbn) { missingFields.push('isbn'); }
        if (!request.body.cost) { missingFields.push('cost'); }
        if (!request.body.genre) {missingFields.push('genre'); }
        
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
        const bookGenre = request.body.genre;
        
        console.log("authorFirstname:", authorFirstName);
        console.log("authorLastName:", authorLastName);

          //Check if author exists:
        let existingAuthor = await Author.findByNames(authorFirstName, authorLastName);
        let author_id;
        if (existingAuthor) {
            //Author exists in db, return ID and do not create author
            author_id = existingAuthor.author_id;
            console.log("Author existis with ID:", existingAuthor.author_id);
        }else {
            //Author doesn't exist - create author 
            const newAuthor = await Author.create({
                first_name: authorFirstName,
                last_name: authorLastName, 
            });
            author_id = newAuthor;             
        }
        console.log("Created author", author_id);
        
        //Create book in DB 
        const newBook = {
            title: bookTitle,
            author_id: author_id,
            isbn: bookIsbn,
            edition: bookEdition,
            cost: bookCost,
            genre: bookGenre,
        };    
        
        //checking if book exists in DB by ISBN number
        let existingBook = await Book.findByIsbn(request.body.isbn);
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
})

//Route to Delete a Book from Inventory
router.delete('/:isbn', async (request, response) => {
    console.log("Delete by isbn route reached");
    try {
        const isbn = request.params.isbn;
        console.log("Captured ISBN:", isbn);

        //find the book for deletion
        const exisitngBook = await Book.findByIsbn(isbn);
        if (!exisitngBook) {
            return response.status(404).send({ message: 'Book not found' });
        }
                
       // Handle the Promise directly 
        const deleteResult = await Book.deleteByIsbn(isbn); 
        console.log("Delete Result:", deleteResult); // Log the result

        if (deleteResult.deleted) {
            return response.status(200).send({ message: 'Book deleted successfully' });
        } else {
        // Handle cases where 'deleted' might be false 
            return response.status(500).send({ message: 'Error deleting book' });
    }
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Error deleting book' })
    }
})


//Route to update an existing Book's Cost passing isbn as request parameter
router.put('/:isbn/cost', async (request, response) => {
    const isbn = request.params.isbn;
    const updatedCost = request.body.cost;
    
    try {
        const bookToUpdate = await Book.findByIsbn(isbn);
        if (!bookToUpdate) { 
            return response.status(404).send({ message: "Book not found"});
        }
        // Prepare updates object
        const updates = {};
        if (request.body.cost !== undefined) {
          updates.cost = request.body.cost;
        }
        else return response.status(405).send({ message: "no cost input"});
              
        await Book.updateBook(bookToUpdate, updates);

        response.status(200).send({ message: "Book cost updated successfully" });

    } catch (error) {
        console.log("Error in cost update route:", error); 
        response.status(500).send({ message: "Error updating book cost" });
    }
});

//Route to update an existing Book's Quantity passing isbn as request parameter
router.put('/isbn/quantity', async (request, response) => {
    const isbn = request.params.isbn;
    const updatedQuantity = request.body.quantity;
    
    try {
        const bookToUpdate = await Book.findByIsbn(isbn);
        if (!bookToUpdate) { 
            return response.status(404).send({ message: "Book not found"});
        }
        // Prepare updates object
        const updates = {};
        if (request.body.quantity !== undefined) {
          updates.quantity = request.body.quantity;
        }
        else return response.status(405).send({ message: "no quantity input"});

        await Book.updateBook(bookToUpdate, updates);

        response.status(200).send({ message: "Book quantity updated successfully" });

    } catch (error) {
        console.log("Error in quantity update route:", error); 
        response.status(500).send({ message: "Error updating book quantity" });
    }


});

export default router;
