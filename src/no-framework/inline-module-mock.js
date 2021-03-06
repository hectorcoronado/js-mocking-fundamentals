function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  return mockFn;
}

/**
 * jest.mock works because jest is in control of the whole
 * module system. we can simulate that kind of control with
 *
 * `require.cache`
 *
 * and doing the following:
 */
const utilsPath = require.resolve("../utils");

// assign an object to `require.cache[utilsPath] to override it:`
require.cache[utilsPath] = {
  // the object we're mocking needs to resemble a module,
  // so assign `utilsPath` value to `id`
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1),
  },
};

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"],
]);

// cleanup
delete require.cache[utilsPath];
