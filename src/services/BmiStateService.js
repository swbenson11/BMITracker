import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MemoryService } from './MemoryService';

export class BmiStateService {
	entries = MemoryService.readData('data') || [];
	setEntries = (value) => (this.entries = value);

	delete = (id) => {
		this.entries = this.entries.filter((i) => {
			return i.id !== id;
		});
	};

	add = (val) => {
		let heightInM = val.height / 100;
		val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
		val.id = uuidv4();
		let newEntries = [...this.entries, val];
		let len = newEntries.length;
		if (len > 7) newEntries = newEntries.slice(1, len);
		this.entries = newEntries;
	};
}

export const BmiStateContext = React.createContext(new BmiStateService());

export default BmiStateService;
