import React, { Suspense, lazy, useEffect, useState } from 'react';
import css from './Page.module.css';
import { fetchMoviesDetails } from 'services/Api';
import { toast } from 'react-toastify';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import { toastConfig } from 'services/data';
import { Loader } from 'components/Loader/Loader';
// import PropTypes from 'prop-types';

// import CastPage from './CastPage';
// import ReviewsPage from './ReviewsPage';

const CastPage = lazy(() => import('pages/CastPage'));
const ReviewsPage = lazy(() => import('pages/ReviewsPage'));

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
  //   console.log(movie);
  const { title, poster_path, vote_average, overview, genres } = movie;
  return (
    <div className={css.container_Movie}>
      <h1 className={css.movie_title}>{title}</h1>
      <div className={css.movie_wrap}>
        <img
          src={
            poster_path !== null
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
          }
          className={css.poster}
          alt="Movie Poster"
        />
        <div>
          <h2 className={css.movie_pretitle}>
            User score: {Math.round(vote_average * 10)}%
          </h2>
          <p className={css.movie_text}>
            Overview <br /> {overview}
          </p>
          <h2 className={css.movie_pretitle}>Genres:</h2>
          <p className={css.movie_text}>
            {genres.map(genre => genre.name).join(' ')}
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
      <div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<CastPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

MovieDetailsPage.propTypes = {};

export default MovieDetailsPage;
