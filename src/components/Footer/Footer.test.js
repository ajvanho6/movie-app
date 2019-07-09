import React from 'react';
import {shallow} from 'enzyme';
import Footer from './Footer';

describe('Footer component', () => {
    it('Footer should render correctly', () => {
        const component = shallow(<Footer />);
        expect(component).toMatchSnapshot();
    });
});
