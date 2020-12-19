import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function MovieList({ movies, movieClicked, editClicked, removeClicked }) {
  const [token] = useCookies(['mr-token']);

  const handleRemoveClicked = (movie) => {
    API.deleteMovie(movie.id, token['mr-token'])
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
