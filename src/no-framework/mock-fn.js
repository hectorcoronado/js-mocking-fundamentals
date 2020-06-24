const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

/**
 * jest's *fn* function accepts a callback as an argument,
 * called 'implementation' ('impl' for short), and it
 *  - returns that impl func, called with all the arguments,
 *  - keeps track of which arguments have been passed to impl
 * @param {function} impl 
 */
const fn = impl => {
  const mockFn = (...args) => {
    console.log('...args:', ...args)
    // keep track of arguments passed in to impl:
    mockFn.mock.calls.push(args)
    // call impl with arguments
    return impl(...args)
  }

  mockFn.mock = {calls: []}

  return mockFn
}

const originalGetWinner = utils.getWinner
utils.getWinner = fn((p1, p2) => p1)

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler']
])

// cleanup
utils.getWinner = originalGetWinner
