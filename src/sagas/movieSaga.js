import {call, put, all, takeEvery} from 'redux-saga/effects';

import * as movieActionTypes from '../actionTypes/movieActionTypes';
import {searchMovieApi, fetchMovieTrailerApi} from '../api/movieApi';


export const searchMovie = function* searchMovie({payload}) {
    const {query} = payload;

    if (!query.length) {
        return;
    }

    try {
        yield put({
            type: movieActionTypes.SEARCH_MOVIE_REQUEST,
            payload: {
                query,
            },
        });

        const movies = yield call(searchMovieApi, {query});

        yield put({
            type: movieActionTypes.SEARCH_MOVIE_SUCCESS,
            payload: {
                movies,
            },
        });
    } catch (error) {
        yield put({
            type: movieActionTypes.SEARCH_MOVIE_ERROR,
            error: error,
        });
    }
};

export const fetchMovieTrailer = function* fetchMovieTrailer({payload}) {
    const {movieID} = payload;

    try {
        yield put({
            type: movieActionTypes.FETCH_MOVIE_TRAILER_REQUEST,
            payload: {
                movieID,
            },
        });

        const trailer = yield call(fetchMovieTrailerApi, {movieID});

        yield put({
            type: movieActionTypes.FETCH_MOVIE_TRAILER_SUCCESS,
            payload: {
                trailer,
            },
        });
    } catch (error) {
        yield put({
            type: movieActionTypes.FETCH_MOVIE_TRAILER_ERROR,
            error: error,
        });
    }
};

export const searchMovieWatcher = function* searchMovieWatcher() {
    yield all([
        takeEvery(movieActionTypes.SEARCH_MOVIE, searchMovie),
        takeEvery(movieActionTypes.FETCH_MOVIE_TRAILER, fetchMovieTrailer),
    ]);
};
