import React from 'react';

export const MemoryServiceMock = {
	readData: jest.fn().mockReturnValue('Mock Value'),
	saveData: jest.fn().mockReturnValue('Mock Value'),
};

export const MemoryContext = React.createContext(MemoryServiceMock);

export default MemoryServiceMock;
