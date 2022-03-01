const Dealer = require("../models/dealer");
const { getHandValue } = require("../utils/helpers");

jest.mock("../utils/helpers", () => ({
  getHandValue: jest.fn().mockReturnValue(20),
}));

describe("Dealer class", () => {
  const dealer = new Dealer();

  test("defines cleanHand", () => {
    expect(typeof dealer.cleanHand).toBe("function");
  });

  test("Dealer constructor to initialize empty hand and score", () => {
    expect(dealer.hand).toEqual([]);
    expect(dealer.score).toBe(0);
  });

  describe.each([
    {
      hand: [
        { value: "A", suit: "Hearts" },
        { value: "5", suit: "Spades" },
      ],
      score: 16,
    },
    {
      hand: [
        { value: "Q", suit: "Hearts" },
        { value: "J", suit: "Spades" },
      ],
      score: 20,
    },
    {
      hand: [
        { value: "4", suit: "Hearts" },
        { value: "10", suit: "Spades" },
        { value: "K", suit: "Spades" },
      ],
      score: 24,
    },
  ])(
    "cleanHand resets dealer values to initial values for a new game",
    ({ hand, score }) => {
      dealer.hand = hand;
      dealer.score = score;
      dealer.cleanHand();
      expect(dealer.hand).toEqual([]);
      expect(dealer.score).toBe(0);
    }
  );

  test("addScore adds score to dealer using card values of hand", () => {
    dealer.addScore();
    expect(getHandValue).toBeCalledTimes(1);
    expect(dealer.score).toBe(20);
  });
});
