import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

function MovieDetails({ movie, updateMovie }) {

  const [ highlighted, setHightlighted ] = useState(-1);
  const [token] = useCookies(['mr-token']);

  const highlightRate = (high) =>  {
    setHightlighted(high);
  }

  const rateClicked = (rating) => {
    fetch(`http://localhost:8000/api/movies/${movie.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      },
      body: JSON.stringify({ stars: rating + 1 })
    })
    .then(() => getDetails())
    .catch(err => console.log(err));
  }

  const getDetails = () => {
    fetch(`http://localhost:8000/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      },
    })
    .then(resp => resp.json())
    .then(resp => updateMovie(resp))
    .catch(err => console.log(err));
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
                        onClick={() => rateClicked(idx)}
                      />
            })}
          </div>
        </div>
      ): null }
    </>
  );
}

export default MovieDetails;
