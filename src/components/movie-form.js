import React, { useState } from 'react';

function MovieForm({ movie }) {

  const [title, setTitle ] = useState(movie.title);
  const [description, setDescription ] = useState(movie.description);

  const updateClicked = () => {
    console.log('updated');
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
          <button onClick={updateClicked}>Update</button>
        </div>
      ) : null }
    </>
  );
}

export default MovieForm
