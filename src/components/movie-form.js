import React, { useState } from 'react';
import { API } from '../api-service';

function MovieForm({ movie, updatedMovie, createdMovie }) {

  const [title, setTitle ] = useState(movie.title);
  const [description, setDescription ] = useState(movie.description);

  const updateClicked = () => {
    console.log('updated');
    API.updateMovie(movie.id, {title: title, description: description})
    .then(resp => updatedMovie(resp))
    .catch(error => console.log(error))
  }

  const createClicked = () => {
    API.createMovie({title: title, description: description})
    .then(resp => createdMovie(resp))
    .catch(error => console.log(error))
  }

  return (
    <>
      { movie ? (
        <div>
          <label htmlFor="title">Title</label><br/>
          <input id="title" type="text" placeholder="title" value={title}
            onChange={event => setTitle(event.target.value)}
          /><br/>
          <label htmlFor="description">Description</label><br/>
          <textarea id="description" type="text" placeholder="description" value={description}
            onChange={event => setDescription(event.target.value)}
          ></textarea><br/>

          {
            movie.id
            ? <button onClick={updateClicked}>Update</button>
            : <button onClick={createClicked}>Create</button>
          }
        </div>
      ) : null }
    </>
  );
}

export default MovieForm
