const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  const originalGetWinner = utils.getWinner;
  // jest's fn can be provided an implementation
  // of a function that we're mocking; it can keep
  // track of the arguments it's called with (these
  // can be seen under the `mock` property of whatever
  // )
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar("Kent C Dodds", "Ken Wheeler");
  console.log(utils.getWinner.mock);

  expect(winner).toBe("Kent C Dodds");

  /*
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenCalledWith("Kent C Dodds", "Ken Wheeler");
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    1,
    "Kent C Dodds",
    "Ken Wheeler"
  );
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    2,
    "Kent C Dodds",
    "Ken Wheeler"
  );
  */

  // all the above commented asssertions can be covered with
  // `mock.calls`, because it's ascertaining the no. of times
  // the function is called, which args it's passed and in which
  // order:
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C Dodds", "Ken Wheeler"],
    ["Kent C Dodds", "Ken Wheeler"],
  ]);

  // cleanup:
  utils.getWinner = originalGetWinner;
});
