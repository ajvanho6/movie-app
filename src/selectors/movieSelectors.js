import {createSelector} from 'reselect';
import {
    IS_SEARCHING_MOVIES,
    ALL_MOVIES,
} from '../reducers/movieReducer';

export const selectMovies = state => state.movies;


export const createAllMoviesSelector = () => createSelector(
    [
        selectMovies,
    ],
    movies => {
        return movies.get(ALL_MOVIES).toJS();
    },
);

export const createIsSearchingMoviesSelector = () => createSelector(
    [
        selectMovies,
    ],
    movies => {
        if (movies.get(IS_SEARCHING_MOVIES) !== false) {
            return true;
        }

        return movies.get(IS_SEARCHING_MOVIES);
    },
);
