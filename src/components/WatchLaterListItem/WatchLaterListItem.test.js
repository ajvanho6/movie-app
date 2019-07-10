import React from 'react';
import {shallow} from 'enzyme';

import WatchLaterListItem from './WatchLaterListItem';

describe('Watch Later List Item tests', () => {
    it('renders list items', () => {
        const watchLaterMovie = {
            id: 239563,
            title: 'St. Vincent',
            backdrop_path: {
                poster_path: 'someUrl',
            },
        };

        const wrapper = shallow(<WatchLaterListItem watchLaterMovie={watchLaterMovie} />);

        expect(wrapper.find('img')).toBeDefined();
        expect(wrapper.find('h2')).toBeDefined();
        expect(wrapper.find('p')).toBeDefined();
    });
});
