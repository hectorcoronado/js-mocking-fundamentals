const thumbWar = require('../thumb-war')
const utils = require('../utils')

/**
 * monkey-patching only works as it's been implemented
 * when you're using commonJs; in es-module scenario,
 * monkey-patching does not work, but can be mocked with
 * this api:
 * 
 * jest.mock('path/to/module', aModuleFactoryFunction)
 * 
 * the 2nd argument returns the mocked version
 * of the module
 * 
 * Example below works because `../thumb-war` calls
 * `utils.getWinner` function
 */
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1)
  }
})



test('returns winner', () => {
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])
  console.log('utils.getWinner.mockReset()', utils.getWinner.mockReset)
  // cleanup -- reset `getWinner` to whatever it was prior
  // to running `utils.getWinner.mock.calls`
  utils.getWinner.mockReset()
})
