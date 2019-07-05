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
