import {List, Map} from 'immutable';
import * as movieActionTypes from '../actionTypes/movieActionTypes';

export const IS_SEARCHING_MOVIES = 'isSearchingMovies';
export const ALL_MOVIES = 'allMovies';

const initialState = Map({
    [ALL_MOVIES]: List([]),
    [IS_SEARCHING_MOVIES]: false,
});

const movieReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case movieActionTypes.SEARCH_MOVIE_REQUEST: {
            return state
                .set(IS_SEARCHING_MOVIES, true);
        }

        case movieActionTypes.SEARCH_MOVIE_SUCCESS: {
            const {movies} = payload;

            return state
                .set(IS_SEARCHING_MOVIES, false)
                .set(ALL_MOVIES, List(movies.results));
        }

        case movieActionTypes.SEARCH_MOVIE_ERROR: {
            return state
                .set(IS_SEARCHING_MOVIES, false);
        }

        default:
            return state;
    }
};

export default movieReducer;
