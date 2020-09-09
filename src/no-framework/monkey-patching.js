const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

// we can override the `getWinner` function here
// by making sure that it always returns one of
// the players as the winner; this ensures that
// our assertion will work correctly:
//
// this is called MONKEY PATCHING, and makes our
// test DETERMINISTIC:
const originalGetWinner = utils.getWinner;
utils.getWiner = (p1, p2) => p1;

// first, get the winner of the thumbWar
const winner = thumbWar("Kent", "Dude");

// then test that Ken won:
assert.strictEqual(winner, "Kent");

// it's important to clean-up our monkey-patching,
// so that further tests are not impacted.
utils.getWinner = originalGetWinner;
