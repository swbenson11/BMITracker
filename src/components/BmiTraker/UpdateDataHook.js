import React from 'react';

export function UpdateDataHook(state, memoryService) {
	const [data, setData] = React.useState({});

	React.useEffect(() => {
		memoryService.saveData('data', state);
		const date = state.map((obj) => obj.date);
		const bmi = state.map((obj) => obj.bmi);

		let newData = { date, bmi };
		setData(newData);
	}, [memoryService, state]);
	return data;
}

export default UpdateDataHook;
