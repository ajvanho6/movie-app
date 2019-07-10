import React from 'react';
import {shallow} from 'enzyme';

import WatchLaterList from './WatchLaterList';

describe('WatchLaterList tests', () => {
    it('renders list items', () => {
        const watchLaterMovies = [
            {
                id: 239563,
                title: 'St. Vincent',
            },
            {
                id: 502406,
                title: 'St. Agatha',
            },
        ];
        const wrapper = shallow(<WatchLaterList watchLaterMovies={watchLaterMovies} />);

        expect(wrapper.find('.m-app-watch-later-list-item')).toBeDefined();
    });
});
