const Deck = require("../models/cards");

describe("Deck class", () => {
  const deck = new Deck();

  test("constructor creates an empty cards array ", () => {
    expect(deck.cards).toEqual([]);
  });

  test("buildDeck creates a deck", () => {
    deck.buildDeck();
    expect(deck.cards).toHaveLength(52);
  });
  test("deck should contain all four suits", () => {
    expect(deck.cards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ suit: "Hearts" }),
        expect.objectContaining({ suit: "Diamonds" }),
        expect.objectContaining({ suit: "Spades" }),
        expect.objectContaining({ suit: "Clubs" }),
      ])
    );
  });
  test("deck should contain numbers between 2-10", () => {
    const values = deck.cards
      .map((card) => parseInt(card.value))
      .filter((value) => value);
    console.log("values ", values);
    const minNumber = Math.min(...values);
    const maxNumber = Math.max(...values);
    expect(minNumber).toBe(2);
    expect(maxNumber).toBe(10);
  });
  test("deck should contain A, K, Q and J", () => {
    expect(deck.cards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: "A" }),
        expect.objectContaining({ value: "K" }),
        expect.objectContaining({ value: "Q" }),
        expect.objectContaining({ value: "J" }),
      ])
    );
  });
  /*
  test("shuffleDeck shuffles the deck", () => {
  });
  */
});
