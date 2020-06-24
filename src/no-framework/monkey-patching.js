const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

/**
 * "Monkey-patching" illustrated by the following process:
 */

// create copy of the utility function as it exists
const originalGetWinner = utils.getWinner

// override it with deterministic function that tests
// as we expect
utils.getWinner = (p1, p2) => p1

const winner = thumbWar('Kent C Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C Dodds')

// re-assign the utility to original
utils.getWinner = originalGetWinner