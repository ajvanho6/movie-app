import React from 'react';
import {shallow} from 'enzyme';

import FavoriteListItem from './FavoriteListItem';

describe('Favorite List Item tests', () => {
    it('renders list items', () => {
        const favoriteMovie = {
            id: 239563,
            title: 'St. Vincent',
        };

        const trailer = {
            id: 1,
            results: [
                {
                    key: '/someUrl',
                },
                {
                    key: '/someotherUrl',
                },
            ],
        };
        const wrapper = shallow(<FavoriteListItem favoriteMovie={favoriteMovie} trailer={trailer} />);

        expect(wrapper.find('h2')).toBeDefined();
        expect(wrapper.find('iframe')).toBeDefined();
    });
});
