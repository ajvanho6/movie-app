import React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';

describe('Header component', () => {
    it('Header should render correctly', () => {
        const component = shallow(<Header />);
        expect(component).toMatchSnapshot();
    });
});
