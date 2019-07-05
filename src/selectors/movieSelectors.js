import {createSelector} from 'reselect';
import {
    IS_SEARCHING_MOVIES,
    ALL_MOVIES,
    FAVORITE_MOVIES,
    MOVIE_TRAILERS,
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

export const createFavoritesMoviesSelector = () => createSelector(
    [
        selectMovies,
    ],
    movies => {
        return movies.get(FAVORITE_MOVIES).toJS();
    },
);

export const createMoviesTrailerSelector = () => createSelector(
    [
        selectMovies,
    ],
    movies => {
        return movies.get(MOVIE_TRAILERS).toJS();
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
