const Deck = require("../models/cards");
const Player = require("../models/player");
const Dealer = require("../models/dealer");
const { getHandValue } = require("../utils/helpers");

class Game {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  newGame() {
    this.deck.buildDeck();
    this.deck.shuffleDeck();
    this.player.cleanHand();
    this.dealer.cleanHand();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      this.player.hand[i] = this.pop();
      this.dealer.hand[i] = this.pop();
    }
  }

  gameStatusAfterDeal() {
    let status = {
      player: this.player,
      dealer: this.dealer,
      deck: this.deck.cards,
    };
    if (this.player.score === 21 && this.dealer.score === 21) {
      this.player.handStatus = "PUSH";
    } else if (this.player.score === 21) {
      this.player.handStatus = "BLACKJACK";
    } else if (this.dealer.score === 21) {
      this.player.handStatus = "LOSE";
    } else {
      this.player.handStatus = "PLAYING";
      //if player status stays playing reveal only face up card of dealer
      const showDealer = {
        hand: [this.dealer.hand[0]],
        score: getHandValue([this.dealer.hand[0]]),
      };
      status = { ...status, dealer: showDealer };
    }
    return status;
  }

  gameStatus() {
    let status = {
      player: this.player,
      dealer: this.dealer,
      deck: this.deck.cards,
    };
    if (this.player.score > 21) {
      this.player.handStatus = "BUSTED";
    } else if (this.player.score === 21) {
      this.dealerScore();
      if (this.dealer.score === 21) {
        this.player.handStatus = "PUSH";
      } else {
        this.player.handStatus = "WIN";
      }
    } else {
      this.player.handStatus = "PLAYING";
      //if player status stays playing reveal only face up card of dealer
      const showDealer = {
        hand: [this.dealer.hand[0]],
        score: getHandValue([this.dealer.hand[0]]),
      };
      status = { ...status, dealer: showDealer };
    }
    return status;
  }

  pop() {
    const newCard = this.deck.cards.pop();
    return newCard;
  }

  hit() {
    const card = this.pop();
    this.player.hand.push(card);
  }

  stand() {
    let status = {
      player: this.player,
      dealer: this.dealer,
      deck: this.deck.cards,
    };
    this.dealerScore();
    if (this.dealer.score >= 17 && this.dealer.score <= 21) {
      //compare with player hand value
      if (this.dealer.score > this.player.score) {
        this.player.handStatus = "LOSE";
      } else if (this.dealer.score === this.player.score) {
        this.player.handStatus = "PUSH";
      } else {
        this.player.handStatus = "WIN";
      }
    } else {
      //else dealer busted
      this.player.handStatus = "WIN";
    }
    return status;
  }

  dealerScore() {
    while (this.dealer.score < 17) {
      const card = this.pop();
      this.dealer.hand.push(card);
      this.dealer.addScore();
    }
  }
}

module.exports = new Game();
