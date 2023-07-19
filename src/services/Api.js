import axios from 'axios';
// import { toast } from 'react-toastify';

export const TRENDING = 'https://api.themoviedb.org/3/trending/movie/week';
export const BYQUERY = 'https://api.themoviedb.org/3/search/movie';
export const BYID = `https://api.themoviedb.org/3/movie`;

const API_KEY = 'da941fd87e0dbd132cbb203164655245'

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

// async function fetchMovies(USED_URL, searchQuery = '') {
//   const axiosOptions = {
//     method: 'get',
//     url: USED_URL,
//     params: {
//       api_key: 'da941fd87e0dbd132cbb203164655245',
//       query: searchQuery,
//     },
//   };
//   // try {
//   const response = await axios(axiosOptions);
//   return response.data;
//   //   } catch {
//   //     toast.info("We're sorry, but you've reached the end of search results.");
//   //   }
// }
// export default fetchMoviesTrending, fe;
