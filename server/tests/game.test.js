const Deck = require("../models/cards");
const Player = require("../models/player");
const Dealer = require("../models/dealer");
const { getHandValue } = require("../utils/helpers");
const { dealCards } = require("../models/game");

jest.mock("../utils/helpers", () => ({
  getHandValue: jest.fn().mockReturnValue(20),
}));

jest.mock("../models/cards");
jest.mock("../models/player");
jest.mock("../models/dealer");

describe("Game class", () => {
  const Game = require("../models/game");
  describe("game initialize", () => {
    test("Game calls Deck, Player and Dealer classes constructors", () => {
      expect(Deck).toHaveBeenCalledTimes(1);
      expect(Player).toHaveBeenCalledTimes(1);
      expect(Dealer).toHaveBeenCalledTimes(1);
    });
    test("newGame calls functions to start a new game", () => {
      const mockDeckInstance = Deck.mock.instances[0];
      const mockDeckBuild = mockDeckInstance.buildDeck;
      const mockDeckShuffle = mockDeckInstance.shuffleDeck;
      const mockPlayerInstance = Player.mock.instances[0];
      const mockPlayerCleanHand = mockPlayerInstance.cleanHand;
      const mockDealerInstance = Dealer.mock.instances[0];
      const mockDealerCleanHand = mockDealerInstance.cleanHand;
      Game.newGame();
      expect(mockDeckBuild).toHaveBeenCalledTimes(1);
      expect(mockDeckShuffle).toHaveBeenCalledTimes(1);
      expect(mockPlayerCleanHand).toHaveBeenCalledTimes(1);
      expect(mockDealerCleanHand).toHaveBeenCalledTimes(1);
    });
    test("dealCards deals starting hands", () => {
      const spyPop = jest
        .spyOn(Game, "pop")
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => true);
      Game.dealer.hand = [];
      Game.player.hand = [];
      Game.dealCards();
      expect(spyPop).toHaveBeenCalledTimes(4);
    });
  });

  describe("Game status after deal", () => {
    test("player and dealer have blackjack", () => {
      Game.player.score = 21;
      Game.dealer.score = 21;
      const status = Game.gameStatusAfterDeal();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "PUSH",
        })
      );
    });
    test("player has blackjack", () => {
      Game.player.score = 21;
      Game.dealer.score = 17;
      const status = Game.gameStatusAfterDeal();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "BLACKJACK",
        })
      );
    });
    test("dealer has blackjack", () => {
      Game.player.score = 15;
      Game.dealer.score = 21;
      const status = Game.gameStatusAfterDeal();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "LOSE",
        })
      );
    });
    test("player keeps playing", () => {
      Game.player.score = 15;
      Game.dealer.score = 10;
      Game.dealer.hand = [
        { value: "10", suit: "Spades" },
        { value: "2", suit: "Diamonds" },
      ];
      const status = Game.gameStatusAfterDeal();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "PLAYING",
        })
      );
      expect(status.dealer.hand).toHaveLength(1);
    });
  });
  describe("Game status after playing", () => {
    const spyDealerScore = jest.spyOn(Game, "dealerScore");
    test("player busted if score is over 21", () => {
      Game.player.score = 23;
      const status = Game.gameStatus();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "BUSTED",
        })
      );
    });
    test("push if dealer and player both have 21", () => {
      Game.player.score = 21;
      Game.dealer.score = 21;
      const status = Game.gameStatus();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "PUSH",
        })
      );
      expect(spyDealerScore).toHaveBeenCalledTimes(1);
    });
    test("player wins when score is 21 and dealer didn't get 21", () => {
      spyDealerScore.mockClear();
      Game.player.score = 21;
      Game.dealer.score = 18;
      const status = Game.gameStatus();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "WIN",
        })
      );
      expect(spyDealerScore).toHaveBeenCalledTimes(1);
    });
    test("player can keep playing after hit", () => {
      spyDealerScore.mockClear();
      Game.player.score = 15;
      const status = Game.gameStatus();
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "PLAYING",
        })
      );
      expect(spyDealerScore).toHaveBeenCalledTimes(0);
    });
  });
  test("pop function takes last card from deck and returns it", () => {
    Game.deck.cards = [
      { value: "10", suit: "Hearts" },
      { value: "A", suit: "Spades" },
      { value: "4", suit: "Diamonds" },
    ];
    const card = Game.pop();
    expect(card).toEqual(
      expect.objectContaining({
        value: "4",
        suit: "Diamonds",
      })
    );
    expect(Game.deck.cards).toHaveLength(2);
  });
  test("hit function adds a card from the deck to player hand", () => {
    const spyPop = jest
      .spyOn(Game, "pop")
      .mockImplementationOnce(() => ({ value: "K", suit: "Spades" }));
    spyPop.mockClear();
    Game.hit();
    expect(spyPop).toHaveBeenCalledTimes(1);
    const index = Game.player.hand.length - 1;
    expect(Game.player.hand[index]).toEqual(
      expect.objectContaining({
        value: "K",
        suit: "Spades",
      })
    );
  });
  describe("stand function", () => {
    const spyDealerScore = jest.spyOn(Game, "dealerScore");
    test("player loses when score is smaller than dealers", () => {
      Game.player.score = 17;
      Game.dealer.score = 20;
      const status = Game.stand();
      expect(spyDealerScore).toHaveBeenCalledTimes(1);
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "LOSE",
        })
      );
    });
    test("push when player and dealer have same score", () => {
      spyDealerScore.mockClear();
      Game.player.score = 18;
      Game.dealer.score = 18;
      const status = Game.stand();
      expect(spyDealerScore).toHaveBeenCalledTimes(1);
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "PUSH",
        })
      );
    });
    test("player loses when score is smaller than dealers", () => {
      spyDealerScore.mockClear();
      Game.player.score = 20;
      Game.dealer.score = 17;
      const status = Game.stand();
      expect(spyDealerScore).toHaveBeenCalledTimes(1);
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "WIN",
        })
      );
    });
    test("player wins if dealer busts", () => {
      spyDealerScore.mockClear();
      Game.player.score = 20;
      Game.dealer.score = 23;
      const status = Game.stand();
      expect(spyDealerScore).toHaveBeenCalledTimes(1);
      expect(status.player).toEqual(
        expect.objectContaining({
          handStatus: "WIN",
        })
      );
    });
  });

  describe("dealerScore function", () => {
    const mockDealerInstance = Dealer.mock.instances[0];
    const mockDealerAddScore = mockDealerInstance.addScore;
    const spyPop = jest.spyOn(Game, "pop");
    test("dealerScore don't add card when dealer's score is 17 or over", () => {
      spyPop.mockClear();
      Game.dealer.score = 18;
      Game.dealerScore();
      expect(mockDealerAddScore).toHaveBeenCalledTimes(0);
      expect(spyPop).toHaveBeenCalledTimes(0);
    });

    test("dealerScore calls pop and addScore when dealer's score is under 17", () => {
      spyPop.mockClear();
      spyPop.mockImplementationOnce(() => ({ value: "Q", suit: "Hearts" }));
      mockDealerAddScore.mockImplementationOnce(() => {
        Game.dealer.score = 25;
      });
      Game.dealer.score = 15;
      Game.dealerScore();
      expect(spyPop).toHaveBeenCalledTimes(1);
      expect(mockDealerAddScore).toHaveBeenCalledTimes(1);
    });
  });
});
