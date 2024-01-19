// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const SearchPage = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    history.push(`/results/${searchTerm}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mt-5">
      <h1>Search Page</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

const ResultsPage = ({ match }) => {
  const { searchTerm } = match.params;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?client_id=vHQwKBOeNfETniWfP3EtPiBWEIb7FJdhe8d0ja2uTUE&query=${searchTerm}`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <h1>Search Images</h1>
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Search
      </Link>
      <div className="main">
        {searchResults.map((result) => (
          <div key={result.id} className="name">
            <img src={result.urls.small} className="card-img-top" alt={result.alt_description} />
            <div className="card-body">
              <h5 className="card-title">ID: {result.id}</h5>
              <p className="card-text">Description: {result.description || 'No description available'}</p>
              <p className="card-text">Created At: {result.created_at}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/results/:searchTerm" component={ResultsPage} />
      </Switch>
    </Router>
  );
};

export default App;
