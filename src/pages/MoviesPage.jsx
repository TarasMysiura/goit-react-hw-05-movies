import Searchbar from 'components/Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesSearch } from 'services/Api';
import css from './Page.module.css';
import { Loader } from 'components/Loader/Loader';
import { toastConfig } from 'services/data';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMoviesByQuery = async () => {
      if (searchQuery.trim() === '') {
        return;
      }
      try {
        setIsLoading(true);
        const { results } = await fetchMoviesSearch(searchQuery);
        console.log(results);
        if (results.length === 0 || !results) {
          return toast.error('Sorry movies not found...', toastConfig);
        }
        toast.success(
          'Your search movies were successfully fetched!',
          toastConfig
        );

        setMovies(results);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Error fetching movie: ${error}`, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesByQuery();
  }, [searchQuery]);

  const handleInputChange = searchQuery => {
    setSearchQuery(searchQuery);
    setMovies([]);
  };

  return (
    <div>
      <Searchbar onSubmit={handleInputChange} />
      {isLoading && <Loader />}

      <ul className={css.movieList}>
        {movies.map(({ id, original_title }) => (
          <li key={id} className={css.movieItem}>
            <Link state={{ from: location }} to={`/movies/${id}`}>
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
