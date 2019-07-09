import React from 'react';
import {shallow} from 'enzyme';

import FavoriteList from './FavoriteList';

describe('FavoriteList tests', () => {
    it('renders list items', () => {
        const movies = [
            {
                id: 239563,
                title: 'St. Vincent',
            },
            {
                id: 502406,
                title: 'St. Agatha',
            },
        ];
        const wrapper = shallow(<FavoriteList movies={movies} />);

        expect(wrapper.find('.m-app-favorite-list-item')).toBeDefined();
    });
});
