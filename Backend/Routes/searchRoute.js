import express from 'express';
import Book from '../models/bookModel';
import Author from '../models/authorModel.js';
import Search  from '../models/searchModel.js';

const router = express.Router();

console.log("In searchRoute");

router.get('/title/:searchTerm', async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;

        //Input Validation
        if (!searchTerm) {
            return res.status(400).json({ error: 'Please provide a search term' })
        }
        const searchResults = await Search.searchByTitle(searchTerm);

        //Check if results are empty
        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'No book found matching search criteria'});
        }
        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Search failed'});
        
    }
})

router.get('/genre/:searchGenre', async (req, res) => {
    console.log('inside get genre router');
    try {
        console.log('inside get genre try block');
        console.log('Query paramters: ', req.params);
        const searchGenre = req.params.searchGenre;
        console.log(searchGenre);

        //Input Validation
        if (!searchGenre) {
            return res.status(400).json({ error: 'Please provide a search term' })
        }
        const searchResults = await Search.searchByGenre(searchGenre);

        //Check if results are empty
        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'No book found matching search criteria'});
        }
        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Search failed'});
        
    }
})

router.get('/author/:searchAuthor', async (req, res) => {
    console.log('inside get author search router');
    try {
        console.log('inside get author search try block');
        console.log('Query paramters: ', req.params);
        const searchAuthor = req.params.searchAuthor;
        console.log(searchAuthor);

        //Input Validation
        if (!searchAuthor) {
            return res.status(400).json({ error: 'Please provide a search term' })
        }
        const searchResults = await Search.searchByAuthor(searchAuthor);

        //Check if results are empty
        if (searchResults.length === 0) {
            return res.status(404).json({ message: 'No book found matching search criteria'});
        }
        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Search failed'});
        
    }
})

export default router;