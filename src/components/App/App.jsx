import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import BmiTracker from '../BmiTraker/BmiTracker';
import { MemoryContext, MemoryService } from '../../services/MemoryService';

const App = () => {
	return (
		<MemoryContext.Provider value={{ MemoryService }}>
			<div className="container">
				<div className="row center">
					<h1 className="white-text"> BMI Tracker </h1>
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
