import axios from 'axios';
import { API_KEY, BYID, BYQUERY, TRENDING } from './data';
// import { toast } from 'react-toastify';

export const fetchMoviesTrending = async () => {
  const axiosOptions = {
    method: 'get',
    url: TRENDING,
    params: {
      api_key: API_KEY,
      //   query: searchQuery,
    },
  };
  const { data } = await axios(axiosOptions);
  return data;
};

export const fetchMoviesSearch = async (searchQuery = '') => {
  const axiosOptions = {
    method: 'get',
    url: BYQUERY,
    params: {
      api_key: API_KEY,
      query: searchQuery,
    },
  };
  const { data } = await axios(axiosOptions);
  return data;
};

export const fetchMoviesDetails = async idMovie => {
  const axiosOptions = {
    method: 'get',
    url: `${BYID}/${idMovie}`,
    params: {
      api_key: API_KEY,
      id: idMovie,
    },
  };
  const { data } = await axios(axiosOptions);
  return data;
};

export const fetchMoviesDetailsCast = async idMovie => {
  const axiosOptions = {
    method: 'get',
    url: `${BYID}/${idMovie}/credits`,
    params: {
      api_key: API_KEY,
      id: idMovie,
    },
  };
  const { data } = await axios(axiosOptions);
  return data;
};

export const fetchMoviesDetailsReviews = async idMovie => {
  const axiosOptions = {
    method: 'get',
    url: `${BYID}/${idMovie}/reviews`,
    params: {
      api_key: API_KEY,
      id: idMovie,
    },
  };
  const { data } = await axios(axiosOptions);
  return data;
};
