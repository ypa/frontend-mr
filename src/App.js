import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';

function App() {

  const [movies, setMovie] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token f390442bb40f4ac8918b6564088a53a775a00612'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovie(resp))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} />
        <div>Movie details</div>
      </div>
    </div>
  );
}

export default App;
