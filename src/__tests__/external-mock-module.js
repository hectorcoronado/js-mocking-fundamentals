const thumbWar = require("../thumb-war");
const utils = require("../utils");

// jest.mock("../utils", () => {
//   return {
//     getWinner: jest.fn((p1, p2) => p1),
//   };
// });

// we can get rid of the above, and just call it as
// follows, since jest will automatically pick up
// whatever is in the __mocks__ directory:
jest.mock("../utils");

test("returns winner", () => {
  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C. Dodds", "Ken Wheeler"],
    ["Kent C. Dodds", "Ken Wheeler"],
  ]);

  // cleanup
  utils.getWinner.mockReset();
});
