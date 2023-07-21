import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchMoviesTrending } from 'services/Api';

import css from './Page.module.css';

import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import { toastConfig } from 'services/data';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesFunc = async () => {
      try {
        setIsLoading(true);

        const data = await fetchMoviesTrending();
        setMovies(data.results);
        toast.success('Its OK', toastConfig);
        setIsLoading(false);
      } catch (error) {
        toast.error(error, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesFunc();
  }, []);
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <ul className={css.movieList}>
        {movies.map(({ id, original_title }) => (
          <li key={id} className={css.movieItem}>
            <Link to={`/movies/${id}`}>{original_title}</Link>
          </li>
        ))}
      </ul>
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
