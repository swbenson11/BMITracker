export const MemoryServiceMock = {
	readData: jest.fn().mockReturnValue('Mock Value'),
	saveData: jest.fn().mockReturnValue('Mock Value'),
};

export default MemoryServiceMock;
