import React from 'react';
import {shallow} from 'enzyme';

import MovieList from './MovieList';

describe('MovieList tests', () => {
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
        const wrapper = shallow(<MovieList movies={movies} />);

        expect(wrapper.find('.m-app-movie-list')).toBeDefined();
    });
});
