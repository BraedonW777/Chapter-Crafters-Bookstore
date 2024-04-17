import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchResults, setSearchResults] = useState([]);
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search/${searchCriteria}/${encodeURIComponent(searchTerm)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
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
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}><Link to={`/books/${result.book_id}`}>{result.title}</Link> - {result.author_fullname} - {result.genre}- {result.cost}</li>
          // Render additional search result information here //Need to add cost to SQL on backend for each search of Genre, author, and title. 
          //cost works on the Title search, but I am not sure why it wont work with Author and Genre. 
        ))}
      </ul>
    </div>
  );
};

export default Search;
