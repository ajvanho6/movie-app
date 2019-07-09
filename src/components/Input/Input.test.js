import React from 'react';
import {shallow} from 'enzyme';
import Input from './Input';

describe('Input component', () => {
    it('Input should render correctly', () => {
        const component = shallow(<Input />);
        expect(component).toMatchSnapshot();
    });

    it('should respond to change event', () => {
        const wrapper = shallow(<Input />);
        expect(wrapper.find('input').simulate('change', {target: {value: 'Star Wars'}}));
    });
});
