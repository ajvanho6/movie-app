import {all, fork} from 'redux-saga/effects';

import {searchMovieWatcher} from './sagas/movieSaga';

const rootSaga = function* rootSaga() {
    yield all([
        fork(searchMovieWatcher),
    ]);
};

export default rootSaga;
