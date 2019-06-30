import * as movieActionTypes from '../actionTypes/movieActionTypes';

export const searchMovie = payload => ({
    type: movieActionTypes.SEARCH_MOVIE,
    payload,
});
