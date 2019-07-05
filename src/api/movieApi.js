import axiosInstance from './axios';
import config from '../config';

const BASE_SEARCH_MOVIE_URL = `/search/movie`;
const BASE_MOVIE_TRAILER_URL = `/movie`;
export const generateSearchMovieByQueryUrl = query => `${BASE_SEARCH_MOVIE_URL}?api_key=${config.API_KEY}&query=${query}`;
const generatefetchMovieTrailerUrl = movieID => `${BASE_MOVIE_TRAILER_URL}/${movieID}/videos?api_key=${config.API_KEY}`;

export const searchMovieApi = ({query}) => axiosInstance({
    method: 'GET',
    url: generateSearchMovieByQueryUrl(query),
}).then(response => response.data);

export const fetchMovieTrailerApi = ({movieID}) => axiosInstance({
    method: 'GET',
    url: generatefetchMovieTrailerUrl(movieID),
}).then(response => response.data);
