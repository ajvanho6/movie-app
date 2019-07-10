import {List, Map} from 'immutable';
import {notify} from 'react-notify-toast';
import * as movieActionTypes from '../actionTypes/movieActionTypes';

export const IS_SEARCHING_MOVIES = 'isSearchingMovies';
export const ALL_MOVIES = 'allMovies';
export const FAVORITE_MOVIES = 'favoriteMovies';
export const MOVIE_TRAILERS = 'movieTrailers';
export const WATCH_LIST = 'watchList';

const initialState = Map({
    [ALL_MOVIES]: List([]),
    [FAVORITE_MOVIES]: List([]),
    [WATCH_LIST]: List([]),
    [MOVIE_TRAILERS]: List([]),
    [IS_SEARCHING_MOVIES]: false,
});

const notificationColor = {background: '#202225', text: '#FFFFFF'};

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

            notify.show('Added to favorites', 'custom', 1000, notificationColor);
            return state
                .update(FAVORITE_MOVIES, favoriteMovies => favoriteMovies.push(favoriteMovie));
        }

        case movieActionTypes.REMOVE_MOVIE_FROM_FAVORITES: {
            return state
                .set(FAVORITE_MOVIES, List([]));
        }

        case movieActionTypes.RESET_MOVIE_TRAILERS: {
            return state
                .set(MOVIE_TRAILERS, List([]));
        }

        case movieActionTypes.ADD_MOVIE_TO_WATCH_LATER_LIST: {
            const {watchListMovie} = payload;

            notify.show('Added to Watch List', 'custom', 1000, notificationColor);
            return state
                .update(WATCH_LIST, watchListMovies => watchListMovies.push(watchListMovie));
        }

        case movieActionTypes.RESET_WATCH_LATER_LIST: {
            return state
                .set(WATCH_LIST, List([]));
        }

        case movieActionTypes.FETCH_MOVIE_TRAILER_REQUEST: {
            return state;
        }

        case movieActionTypes.FETCH_MOVIE_TRAILER_SUCCESS: {
            const {trailer} = payload;
            return state
                .update(MOVIE_TRAILERS, movieTrailer => movieTrailer.push(trailer));
        }

        case movieActionTypes.FETCH_MOVIE_TRAILER_ERROR: {
            return state;
        }

        default:
            return state;
    }
};

export default movieReducer;
