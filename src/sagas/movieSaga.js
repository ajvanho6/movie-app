import {call, put, all, takeEvery} from 'redux-saga/effects';

import * as movieActionTypes from '../actionTypes/movieActionTypes';
import {searchMovieApi} from '../api/movieApi';


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

        const movie = yield call(searchMovieApi, query);

        yield put({
            type: movieActionTypes.SEARCH_MOVIE_SUCCESS,
            payload: {
                movie,
            },
        });
    } catch (error) {
        yield put({
            type: movieActionTypes.SEARCH_MOVIE_ERROR,
            error: error,
        });
    }
};

export const searchMovieWatcher = function* searchMovieWatcher() {
    yield all([
        takeEvery(movieActionTypes.SEARCH_MOVIE, searchMovie),
    ]);
};
