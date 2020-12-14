import React from 'react';

function MovieForm({ movie }) {
  return (
    <>
      { movie ? (
        <h1>{movie && movie.title} edit</h1>
      ) : null }
    </>
  );
}

export default MovieForm
