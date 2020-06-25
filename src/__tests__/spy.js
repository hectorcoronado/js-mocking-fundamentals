const thumbWar = require('../thumb-war')
const utils = require('../utils')

// test('returns winner', () => {
//   const originalGetWinner = utils.getWinner
//   utils.getWinner = jest.fn((p1, p2) => p2)

//   const winner = thumbWar( 'Ken Wheeler', 'Kent C. Dodds')
//   expect(winner).toBe('Kent C. Dodds')
//   expect(utils.getWinner.mock.calls).toEqual([
//     ['Ken Wheeler', 'Kent C. Dodds'],
//     ['Ken Wheeler', 'Kent C. Dodds']
//   ])

//   // cleanup
//   utils.getWinner = originalGetWinner
// })

test('returns winner', () => {
  /**
   * we can simplify our cleanup using
   * jest's 'spyOn' function:
   */
  jest.spyOn(utils, 'getWinner')

  /**
   * then we can monkey-patch whatever's necessary
   * by using the 'mockImplementation()' function:
   */
  utils.getWinner.mockImplementation((p1, p2) => p2)

  const winner = thumbWar('Ken Wheeler', 'Kent C Dodds')

  expect(winner).toBe('Kent C Dodds')
  expect(utils.getWinner.mock.calls).toEqual([
    ['Ken Wheeler', 'Kent C Dodds'],
    ['Ken Wheeler', 'Kent C Dodds']
  ])

  // then we can cleanup by calling 'mockRestore()':
  utils.getWinner.mockRestore()
})