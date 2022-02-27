const Player = require("../models/player");
const { getHandValue } = require("../utils/helpers");

jest.mock("../utils/helpers", () => ({
  getHandValue: jest.fn(),
}));

describe("Player class", () => {
  const player = new Player();

  test("defines cleanHand", () => {
    expect(typeof player.cleanHand).toBe("function");
  });

  test("cleanHand keeps initial values", () => {
    player.cleanHand();
    expect(player).toEqual({ hand: [], handStatus: "", score: 0 });
  });

  test("cleanHand resets player values for a new game", () => {
    player.hand = [
      { value: "A", suit: "Hearts" },
      { value: "5", suit: "Spades" },
    ];
    player.handStatus = "playing";
    player.score = 16;
    player.cleanHand();
    expect(player).toEqual({ hand: [], handStatus: "", score: 0 });
  });

  test("defines addScore", () => {
    expect(typeof player.addScore).toBe("function");
  });

  test("addScore uses card values of player hand to update score ", () => {
    getHandValue.mockReturnValueOnce(16);
    player.addScore();
    expect(getHandValue).toBeCalledTimes(1);
    expect(player.score).toBe(16);
  });
});
