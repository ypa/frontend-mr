import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMoive] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token f390442bb40f4ac8918b6564088a53a775a00612'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(err => console.log(err));
  }, []);

  const loadMovie = movie => {
    setSelectedMoive(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMoive(null);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} />
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        { editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} /> : null }
      </div>
    </div>
  );
}

export default App;
