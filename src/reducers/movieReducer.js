import * as movieActionTypes from '../actionTypes/movieActionTypes';

const initialState = {
    isSearchingMovie: false,
    movies: [],
};

const movieReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case movieActionTypes.SEARCH_MOVIE_REQUEST: {
            return {
                ...state,
                isSearchingMovie: true,
            };
        }

        case movieActionTypes.SEARCH_MOVIE_SUCCESS: {
            return {
                ...state,
                isSearchingMovie: false,
            };
        }

        case movieActionTypes.SEARCH_MOVIE_ERROR: {
            return {
                ...state,
                isSearchingMovie: false,
            };
        }

        default:
            return state;
    }
};

export default movieReducer;
