import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import BmiTracker from '../BmiTraker/BmiTracker';
import { MemoryContext, MemoryService } from '../../services/MemoryService';
import {
	BmiStateContext,
	BmiStateService,
} from '../../services/BmiStateService';

const App = () => {
	return (
		//TODO Set up multiple contexts.
		<MemoryContext.Provider value={{ MemoryService }}>
			<BmiStateContext.Provider
				value={{ BmiStateService: new BmiStateService() }}
			>
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
			</BmiStateContext.Provider>
		</MemoryContext.Provider>
	);
};

export default App;
