import {List, Map} from 'immutable';
import * as movieActionTypes from '../actionTypes/movieActionTypes';

export const IS_SEARCHING_MOVIES = 'isSearchingMovies';
export const ALL_MOVIES = 'allMovies';
export const FAVORITE_MOVIES = 'favoriteMovies';

const initialState = Map({
    [ALL_MOVIES]: List([]),
    [FAVORITE_MOVIES]: List([]),
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

        // local savings no required session_id for api /favourite endpoint
        case movieActionTypes.ADD_MOVIE_TO_FAVORITES: {
            const {favoriteMovie} = payload;
            return state
                .update(FAVORITE_MOVIES, favoriteMovies => favoriteMovies.push(favoriteMovie));
        }

        case movieActionTypes.REMOVE_MOVIE_FROM_FAVORITES: {
            return state
                .set(FAVORITE_MOVIES, List([]));
        }

        default:
            return state;
    }
};

export default movieReducer;
