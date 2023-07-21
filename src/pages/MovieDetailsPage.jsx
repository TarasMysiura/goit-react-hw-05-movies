import React, { useEffect, useState } from 'react';
import css from './Page.module.css';
import { fetchMoviesDetails } from 'services/Api';
import { toast } from 'react-toastify';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import CastPage from './CastPage';
import ReviewsPage from './ReviewsPage';
import { toastConfig } from 'services/data';

// import PropTypes from 'prop-types';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetchMoviesDetails(id);
        setMovie(response);
        // console.log(response)
      } catch (error) {
        toast.error('Error fetching movie details:', error, toastConfig);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  console.log(movie);

  return (
    <div className={css.container_Movie}>
      <h1 className={css.movie_title}>{movie.title}</h1>
      <div className={css.movie_wrap}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className={css.poster}
          alt="Movie Poster"
        />
        <div>
          <h2 className={css.movie_pretitle}>
            User score: {Math.round(movie.vote_average * 10)}%
          </h2>
          <p className={css.movie_text}>
            Overview <br /> {movie.overview}
          </p>
          <h2 className={css.movie_pretitle}>Genres:</h2>
          <p className={css.movie_text}>
            {movie.genres.map(genre => genre.name).join(' ')}
          </p>
          <h2 className={css.movie_pretitle}>Additional information</h2>
          <div className={css.container_mini}>
            <NavLink to="cast" className={css.reviews}>
              Cast
            </NavLink>
            <NavLink to="reviews" className={css.reviews}>
              Reviews
            </NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="cast" element={<CastPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
      </Routes>
    </div>
  );
};

MovieDetailsPage.propTypes = {};

export default MovieDetailsPage;
