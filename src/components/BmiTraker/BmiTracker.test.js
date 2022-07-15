import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BmiTracker from './BmiTracker';
import { MemoryServiceMock } from '../../mocks/services/MemoryService.mock';
import { MemoryContext } from '../../services/MemoryService';

// TODO restore Bar, restore afterEach

describe('BmiTracker', () => {
	let wrapper;
	let initialState = [
		{
			date: `7/11/2021`,
			bmi: 100,
		},
	];

	const jsx = (
		<MemoryContext.Provider value={MemoryServiceMock}>
			<BmiTracker MemoryContext={MemoryContext} />
		</MemoryContext.Provider>
	);

	beforeEach(() => {
		MemoryServiceMock.readData.mockReturnValue(initialState);
	});

	afterEach(() => {
		MemoryServiceMock.saveData.mockReset();
		MemoryServiceMock.readData.mockReset();
	});

	it('renders', () => {
		wrapper = shallow(jsx);
		expect(wrapper).not.toBeNull();
	});

	// Test of Context Injection
	it('Should read memory service on start up', () => {
		wrapper = render(jsx);
		expect(MemoryServiceMock.readData).toBeCalledWith('data');
	});

	// Mocking out state, and fancy object exploration
	it('Should update state when BMI is updated', () => {
		const setState = jest.fn();
		const height = 107;
		const weight = 102;
		//mock out state hook
		const useStateMock = jest.spyOn(React, 'useState');
		useStateMock.mockImplementation((state) => [initialState, setState]);

		wrapper = mount(jsx);

		//Access function passed ot child
		wrapper.find('BmiForm').props('change').change({ height, weight });

		expect(setState).toBeCalledWith(
			expect.arrayContaining([
				expect.objectContaining({ height, weight }),
			])
		);
		useStateMock.mockRestore();
	});

	// Test of useEffect
	it('Should update memory service when BMI is updated', () => {
		// Fixes issue with useEffect not firing. From the documentation
		// the function passed to useEffect fires after layout and paint, during a deferred event.
		// However, not all effects can be deferred. For example, a DOM mutation that is visible to the user
		// must fire synchronously before the next paint so that the user does not perceive a visual inconsistency.
		// (The distinction is conceptually similar to passive versus active event listeners.)
		// For these types of effects, React provides one additional Hook called useLayoutEffect.
		// It has the same signature as useEffect, and only differs in when it is fired.
		// https://reactjs.org/docs/hooks-reference.html#uselayouteffect
		// beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect))
		// afterAll(() => React.useEffect.mockRestore())

		jest.spyOn(React, 'useEffect').mockImplementation(
			React.useLayoutEffect
		);
		const height = 107;
		const weight = 102;
		const bmi = (weight / (((height / 100) * height) / 100)).toFixed(2);

		wrapper = mount(jsx, { flushEffects: [true] });

		//Access function passed ot child
		wrapper.find('BmiForm').props('change').change({ height, weight });
		let test = MemoryServiceMock.saveData.mock.calls;
		// TODO state not useEffect not being called the second time
		expect(MemoryServiceMock.saveData).toBeCalledWith(
			'data',
			expect.arrayContaining([expect.objectContaining({ bmi: bmi })])
		);
	});
});
