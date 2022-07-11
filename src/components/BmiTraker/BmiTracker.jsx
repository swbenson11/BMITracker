import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import BmiForm from '../BmiForm/BmiForm';
import Info from '../Info/Info';
import Bar from '../Bar/Bar';
import { MemoryContext } from '../../services/MemoryService';
import { BmiStateContext } from '../../services/BmiStateService';

const BmiTracker = () => {
	const { MemoryService } = useContext(MemoryContext);
	const { BmiStateService } = useContext(BmiStateContext);

	const [state, setState] = useState(BmiStateService.entries);
	const [data, setData] = useState({});

	// TODO move this to another file
	useEffect(() => {
		MemoryService.saveData('data', BmiStateService.entries);
		// This is redundant, but I need to reference state to trigger the effect.
		// This make having the external state pretty stupid, but I wanted to test out multiple context
		// And test the reactivness of react's hooks.
		BmiStateService.setEntries(state);

		const date = BmiStateService.entries.map((obj) => obj.date);
		const bmi = BmiStateService.entries.map((obj) => obj.bmi);

		let newData = { date, bmi };
		setData(newData);
	}, [MemoryService, BmiStateService, state]);

	const handleChange = (val) => {
		BmiStateService.add(val);
		setState(BmiStateService.entries);
	};

	const handleDelete = (id) => {
		MemoryService.saveData('lastState', BmiStateService.entries);
		BmiStateService.delete(id);
		setState(BmiStateService.entries);
	};

	const handleUndo = () => {
		const lastState = MemoryService.readData('lastState');
		setState(lastState);
		BmiStateService.setEntries(lastState);
	};

	return (
		<div>
			<BmiForm change={handleChange} />
			<Bar labelData={data.date} bmiData={data.bmi} />
			<div>
				<div className="row center">
					<h4 className="white-text">7 Day Data</h4>
				</div>
				<div className="data-container row">
					{BmiStateService.entries.length > 0 ? (
						<>
							{BmiStateService.entries.map((info) => (
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
