import React from 'react';
import { shallow, mount } from 'enzyme';
import BmiTracker from './BmiTracker';
import { MemoryServiceMock } from '../../mocks/services/MemoryService.mock';
import { MemoryContext } from '../../services/MemoryService';

describe('BmiTracker', () => {
	let wrapper;
	let initialState = {
		date: [],
		bmi: [],
	};

	const jsx = (
		<MemoryContext.Provider value={{ MemoryServiceMock }}>
			<BmiTracker />
		</MemoryContext.Provider>
	);

	beforeEach(() => {
		MemoryServiceMock.readData.mockResolvedValue(initialState);
	});

	it('renders', () => {
		wrapper = shallow(jsx);
		expect(wrapper).not.toBeNull();
	});
	it('Should read memory service on start up', () => {
		wrapper = mount(jsx);
		expect(MemoryServiceMock.readData).toBeCalled();
		// expect(MemoryServiceMock.readData).toBeCalledWith('data');
	});
	it('Should update memory when effect is triggered', () => {
		wrapper = mount(jsx);
		expect(MemoryServiceMock.saveData).toBeCalled();
	});
});
