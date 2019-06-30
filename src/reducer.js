import {combineReducers} from 'redux';

import movieReducer from './reducers/movieReducer';

// Combine application reducers
const createRootReducer = history => combineReducers({
    movies: movieReducer,
});

export default createRootReducer;
