import React, { useEffect, useState } from 'react';

import { fetchMoviesTrending } from 'services/Api';

import css from './Page.module.css';

import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { toastConfig } from 'services/data';
import MoviesList from 'components/MoviesList/MoviesList';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMoviesFunc = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMoviesTrending();
        setMovies(results);
        // toast.success('Your posts were successfully fetched!', toastConfig);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesFunc();
  }, []);
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {error && toast.error('Something went wrong...')}
      {movies && <MoviesList movies={movies} location={location} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
