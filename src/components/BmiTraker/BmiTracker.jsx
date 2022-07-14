import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import BmiForm from '../BmiForm/BmiForm';
import Info from '../Info/Info';
import Bar from '../Bar/Bar';
import { MemoryContext } from '../../services/MemoryService';

const BmiTracker = () => {
	const MemoryService = React.useContext(MemoryContext);

	const initialState = () => MemoryService.readData('data') || [];
	const [state, setState] = React.useState(initialState);
	const [data, setData] = React.useState({});

	React.useEffect(() => {
		MemoryService.saveData('data', state);
		const date = state.map((obj) => obj.date);
		const bmi = state.map((obj) => obj.bmi);

		let newData = { date, bmi };
		setData(newData);
	}, [MemoryService, state]);

	const handleChange = (val) => {
		let heightInM = val.height / 100;
		val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
		val.id = uuidv4();
		let newVal = [...state, val];
		let len = newVal.length;
		if (len > 7) newVal = newVal.slice(1, len);
		setState(newVal);
	};

	const handleDelete = (id) => {
		MemoryService.saveData('lastState', state);
		let newState = state.filter((i) => {
			return i.id !== id;
		});
		setState(newState);
	};

	const handleUndo = () => {
		setState(MemoryService.readData('lastState'));
	};

	return (
		<div>
			<BmiForm change={handleChange} />
			{/* <Bar labelData={data.date} bmiData={data.bmi} /> */}
			<div>
				<div className="row center">
					<h4 className="white-text">7 Day Data</h4>
				</div>
				<div className="data-container row">
					{state.length > 0 ? (
						<>
							{state.map((info) => (
								<Info
									key={info.id}
									id={info.id}
									weight={info.weight}
									height={info.height}
									date={info.date}
									bmi={info.bmi}
									deleteCard={handleDelete}
								/>
							))}
						</>
					) : (
						<div className="center white-text">No log found</div>
					)}
				</div>
			</div>
			{MemoryService.readData('lastState') !== null ? (
				<div className="center">
					<button className="calculate-btn" onClick={handleUndo}>
						Undo
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default BmiTracker;
