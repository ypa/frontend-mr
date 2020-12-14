import React from 'react';

function MovieForm({ movie }) {
  return (
    <h1>{movie && movie.title} edit</h1>
  );
}

export default MovieForm
