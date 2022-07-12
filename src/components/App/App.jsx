import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Header from '../Header/Header';
import BmiTracker from '../BmiTraker/BmiTracker';
import { MemoryContext, MemoryService } from '../../services/MemoryService';

const App = () => {
	return (
		<MemoryContext.Provider value={{ MemoryService }}>
			<div className="container">
				<div className="row center">
					<Header>BMI Tracker</Header>
				</div>
				<div className="row">
					<div className="col m12 s12">
						<BmiTracker />
					</div>
				</div>
			</div>
		</MemoryContext.Provider>
	);
};

export default App;
