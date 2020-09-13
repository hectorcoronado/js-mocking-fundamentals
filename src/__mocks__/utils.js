// we can use this directory and file structure
// to export anything we need mocked in our unit
// testing suite:

module.exports = {
  getWinner: jest.fn((p1, p2) => p1),
};
