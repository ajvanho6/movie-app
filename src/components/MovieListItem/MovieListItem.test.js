import React from 'react';
import {shallow} from 'enzyme';

import MovieListItem from './MovieListItem';

describe('Movie List Item tests', () => {
    it('renders list items', () => {
        const movie = {
            id: 239563,
            title: 'St. Vincent',
        };
        const wrapper = shallow(<MovieListItem movie={movie} />);

        expect(wrapper.find('.m-app-movie-list-item')).toBeDefined();
    });
});
