import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMoviesTrending } from 'services/Api';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesFunc = async () => {
      try {
        const data = await fetchMoviesTrending();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
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
    </div>
  );
};

export default HomePage;
