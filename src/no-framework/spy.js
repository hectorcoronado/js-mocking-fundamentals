const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

/**
 * 
 * @param {function} impl default implementation
 */
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

// const originalGetWinner = utils.getWinner
// utils.getWinner = fn((p1, p2) => p2)

/**
 * 
 * @param {object} obj with value that we need to monkeypatch
 * @param {string} obj's property name that we need to monkeypatch 
 */
const spyOn = (obj, prop) => {
  // track the original value that we need to override/monkey-patch
  const originalValue = obj[prop]
  
  // monkeypatch that value
  obj[prop] = fn()

  // restore the original value:
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

spyOn(utils, 'getWinner')
utils.getWinner.mockImplementation((p1, p2) => p1)

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler']
])

// cleanup
// utils.getWinner = originalGetWinner
utils.getWinner.mockRestore()