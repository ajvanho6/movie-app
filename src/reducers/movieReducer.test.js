import {List, Map} from 'immutable';
import * as actions from '../actions/movieActions';
import movieReducer, {
    IS_SEARCHING_MOVIES,
    ALL_MOVIES,
    FAVORITE_MOVIES,
    MOVIE_TRAILERS,
    WATCH_LIST,
} from './movieReducer';

describe('movie reducer', () => {
    it('should return the initial state', () => {
        expect(movieReducer(undefined, {})).toEqual(Map({
            [ALL_MOVIES]: List([]),
            [FAVORITE_MOVIES]: List([]),
            [WATCH_LIST]: List([]),
            [MOVIE_TRAILERS]: List([]),
            [IS_SEARCHING_MOVIES]: false,
        }));
    });

    it('should handle SEARCH_MOVIE_REQUEST', () => {
        const searchAction = {
            type: actions.SEARCH_MOVIE_REQUEST,
        };
        expect(movieReducer({}, searchAction)).toEqual({});
    });
});
