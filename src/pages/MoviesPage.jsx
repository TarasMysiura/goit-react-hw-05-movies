import Searchbar from 'components/Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesSearch } from 'services/Api';
import css from './Page.module.css';
import { Loader } from 'components/Loader/Loader';
import { toastConfig } from 'services/data';

const MoviesPage = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');

  useEffect(() => {
    if (!searchTerm) return;

    const fetchMoviesByQuery = async () => {
      if (searchTerm.trim() === '') {
        return;
      }
      try {
        setIsLoading(true);
        const { results } = await fetchMoviesSearch(searchTerm);
        if (results.length === 0 || !results) {
          return toast.error('Sorry movies not found...', toastConfig);
        }
        // toast.success(
        //   'Your search movies were successfully fetched!',
        //   toastConfig
        // );

        setMovies(results);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Error fetching movie: ${error}`, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesByQuery();
  }, [searchTerm]);

  const handleInputChange = searchQuery => {
    // setSearchQuery(searchQuery);
    setSearchParams({ query: searchQuery });
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
