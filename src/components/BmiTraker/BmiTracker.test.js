import React from 'react';
import { shallow } from 'enzyme';
import BmiTracker from './BmiTracker';

describe('BmiTracker', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BmiTracker />);
	});

	it('renders', () => {
		expect(wrapper).not.toBeNull();
	});
});
