import Searchbar from 'components/Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesSearch } from 'services/Api';
import css from './Page.module.css';
import { Loader } from 'components/Loader/Loader';
import { toastConfig } from 'services/data';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByQuery = async () => {
      console.log(searchQuery);
      if (searchQuery.trim() === '') {
        return;
      }
      try {
        setIsLoading(true);
        const { results } = await fetchMoviesSearch(searchQuery);

        if (results.length === 0) {
          return toast.error('Sorry images not found...', toastConfig);
        }
        console.log(results);
        setMovies(results);
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching movie details:', error, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesByQuery();
  }, [searchQuery]);

  //  useEffect(() => {
  //    movies.length > 0 &&
  //      localStorage.setItem('movies', JSON.stringify(movies));
  //  }, [movies]);

  const handleInputChange = searchQuery => {
    //  console.log(searchQuery);
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
            <Link to={`/movies/${id}`}>{original_title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
