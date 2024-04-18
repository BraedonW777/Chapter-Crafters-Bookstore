import React, {useState} from 'react';
import axios from 'axios';
import { Link,} from 'react-router-dom';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search/${searchCriteria}/${encodeURIComponent(searchTerm)}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
            if (error.response && error.response.status === 404) {
                setSearchError(error.response.data.message);
            } else {
                setSearchError('An error occured during the search. Pleaes try again.')
            }
        }
    };

    function getStockStatus(quantity) {
        if (quantity === 0) {
            return "Out of Stock"
        } else if (quantity < 10) {
            return "Low Stock"
        } else {
            return "In stock"
        }
    }
    




    return (
    <div class="search-container">
        <h1>Search Inventory</h1> 
        <p>Search by title, author, or genre.</p>
        <p>Please choose your search method from the drop-down below. Then enter your criteria.</p>

        <div class="search-form"> 
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>

        <div class="search-results-container">
            <h2>Search Results</h2> 
            <div className="search-result-error-message">
                {searchError}</div>
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index} className="book-container">
                        <div className="book-label">Title:</div>
                        <div className="book-details">
                            <Link to={`/books/${result.book_id}`}>{result.title}</Link>
                        </div>
                        <div className="book-label">Author:</div>
                        <div className="book-details">{result.author_fullname}</div>
                        <div className="book-label">ISBN:</div>
                        <div className="book-details">{result.isbn}</div>
                        <div className="book-label">Cost:</div>
                        <div className="book-details">{result.cost}</div>
                        <div className="book-label">Stock Status:</div>
                        <div className="book-details">{getStockStatus(result.quantity)}</div> 
                    </li>
                ))}
            </ul>
        </div>
    </div>

)};

export default Search;