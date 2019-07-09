import React from 'react';
import {shallow} from 'enzyme';
import Page from './Page';

describe('Page', () => {
    it('should render correctly', () => {
        const component = shallow(<Page />);
        expect(component).toMatchSnapshot();
    });
});
