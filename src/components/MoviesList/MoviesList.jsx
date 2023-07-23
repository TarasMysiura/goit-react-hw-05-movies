import React from 'react';
import PropTypes from 'prop-types';

import css from './MoviesList.module.css';
import { Link } from 'react-router-dom';

const MoviesList = ({ movies, location }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, original_title }) => (
        <li key={id} className={css.movieItem}>
          <Link state={{ from: location }} to={`/movies/${id}`}>
            {original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      original_title: PropTypes.string,
    })
  ),
  location: PropTypes.object.isRequired,
};

export default MoviesList;
