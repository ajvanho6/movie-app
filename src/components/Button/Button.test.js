import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button';

describe('Button component', () => {
    it('Button should render correctly', () => {
        const component = shallow(<Button />);
        expect(component).toMatchSnapshot();
    });
    it('Test click event', () => {
        const mockCallBack = jest.fn();

        const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
