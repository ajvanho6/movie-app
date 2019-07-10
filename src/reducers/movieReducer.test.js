import {List, Map} from 'immutable';
import movieReducer, {
    IS_SEARCHING_MOVIES,
    ALL_MOVIES,
    FAVORITE_MOVIES,
    MOVIE_TRAILERS,
    WATCH_LIST,
} from './movieReducer';

const initialState = Map(
    {
        [ALL_MOVIES]: List([]),
        [FAVORITE_MOVIES]: List([]),
        [WATCH_LIST]: List([]),
        [MOVIE_TRAILERS]: List([]),
        [IS_SEARCHING_MOVIES]: false,
    }
);

describe('movie reducer', () => {
    it('should return the initial state', () => {
        expect(movieReducer(undefined, {})).toEqual(initialState);
    });
});
