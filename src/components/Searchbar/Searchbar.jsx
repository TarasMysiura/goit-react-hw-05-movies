import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { toastConfig } from 'services/data';

const Searchbar = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  // console.log(searchTerm);

  const [movieName, setMovieName] = useState('');

  const handleNameChange = event => {
    setMovieName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchTerm?.trim() === '') {
      toast.error('Please, input movie name', toastConfig);
      return;
    }

    // if (movieName.trim().length > 2) {
    setSearchParams({ query: movieName });
    // }

    onSubmit(movieName);

    setMovieName('');
    // setSearchParams({ query: '' });
  };

  return (
    <div>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch style={{ fontSize: 25 }} />
          </button>
          <input
            onChange={handleNameChange}
            value={movieName}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            required
            minLength={2}
          />
        </form>
      </header>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
