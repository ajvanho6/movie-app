import * as movieActionTypes from '../actionTypes/movieActionTypes';

export const searchMovie = payload => ({
    type: movieActionTypes.SEARCH_MOVIE,
    payload,
});

export const addMovieToFavorites = payload => ({
    type: movieActionTypes.ADD_MOVIE_TO_FAVORITES,
    payload,
});

export const resetFavorites = payload => ({
    type: movieActionTypes.REMOVE_MOVIE_FROM_FAVORITES,
    payload,
});

export const addMovieToWatchLaterList = payload => ({
    type: movieActionTypes.ADD_MOVIE_TO_WATCH_LATER_LIST,
    payload,
});

export const resetWatchLaterList = payload => ({
    type: movieActionTypes.RESET_WATCH_LATER_LIST,
    payload,
});

export const fetchMovieTrailer = payload => ({
    type: movieActionTypes.FETCH_MOVIE_TRAILER,
    payload,
});

export const resetTrailers = payload => ({
    type: movieActionTypes.RESET_MOVIE_TRAILERS,
    payload,
});
