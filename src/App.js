import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMoive] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log(token);
    if (!token['mr-token']) { window.location.href = '/'; }
  }, [token]);

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

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMoive(null);
  }

  const createdMovie = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie rater</span>
        </h1>
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button onClick={ newMovie }>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        { editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} createdMovie={createdMovie} />
        : null }
      </div>
    </div>
  );
}

export default App;
