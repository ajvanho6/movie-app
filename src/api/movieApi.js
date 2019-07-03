import axiosInstance from './axios';
import config from '../config';

const BASE_SEARCH_MOVIE_URL = `/search/movie`;
const generateSearchMovieByQueryUrl = query => `${BASE_SEARCH_MOVIE_URL}?api_key=${config.API_KEY}&query=${query}`;

export const searchMovieApi = ({query}) => axiosInstance({
    method: 'GET',
    url: generateSearchMovieByQueryUrl(query),
}).then(response => response.data);
