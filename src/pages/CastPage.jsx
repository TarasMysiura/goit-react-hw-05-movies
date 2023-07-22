import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesDetailsCast } from 'services/Api';
import { toastConfig } from 'services/data';
import css from './Page.module.css';
import { Loader } from 'components/Loader/Loader';

const CastPage = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const { cast } = await fetchMoviesDetailsCast(id);
        setCast(cast);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);

        toast.error('Error fetching movie details:', error, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [id]);

  return cast.length === 0 ? (
    <h3 className={css.cast_title}>No Cast.</h3>
  ) : (
    <div className={css.castPage_container}>
      <h2 className={css.cast_title}>Cast</h2>
      <ul className={css.cast_list}>
        {cast.map(({ id, profile_path, original_name, character }) => (
          <li key={id} className={css.cast_item}>
            <img
              src={
                profile_path !== null
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              // src = urt
              className={css.cast_img}
              alt={original_name}
            />
            <p className={css.cast_text_name}>
              <span> Actor:</span> {original_name}
            </p>
            <p className={css.cast_text}>
              <span>Character:</span> {character}
            </p>
          </li>
        ))}
      </ul>
      {error && toast.error('Something went wrong...')}
      {isLoading && <Loader />}
    </div>
  );
};

export default CastPage;
