import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails({ movie }) {

  const [ highlighted, setHightlighted ] = useState(-1);

  const highlightRate = (high) =>  {
    setHightlighted(high);
  }

  return (
    <>
      { movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 0 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 1 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 2 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 3 ? 'orange' : ''} />
          <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 4 ? 'orange' : ''} />
          ({movie.no_of_ratings})
          <div className="rate-container">
            <h2>Rate it</h2>
            { [...Array(5)].map((element, idx) => {
              return <FontAwesomeIcon
                        key={idx}
                        icon={faStar}
                        className={highlighted > idx - 1 ? 'purple' : ''}
                        onMouseEnter={() => highlightRate(idx)}
                        onMouseLeave={() => highlightRate(-1)}
                      />
            })}
          </div>
        </div>
      ): null }
    </>
  );
}

export default MovieDetails;
