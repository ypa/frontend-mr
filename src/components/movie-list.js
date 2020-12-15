import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from '../api-service';

function MovieList({ movies, movieClicked, editClicked, removeClicked }) {

  const handleRemoveClicked = (movie) => {
    API.deleteMovie(movie.id)
    .then(() => removeClicked(movie))
    .catch(error => console.log(error));
  }

  return (
    <div>
      { movies && movies.map( movie => {
        return (
          <div key={movie.id} className="movie-item">
            <h2 onClick={() => movieClicked(movie)}>{movie.title}</h2>
            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie) } />
            <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveClicked(movie) } />
          </div>
        )
      })}
    </div>
  );
}

export default MovieList;
