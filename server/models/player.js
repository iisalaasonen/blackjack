const { getHandValue } = require("../utils/helpers");
class Player {
  constructor() {
    this.hand = [];
    this.handStatus = "";
    this.score = 0;
  }

  cleanHand() {
    this.hand = [];
    this.handStatus = "";
    this.score = 0;
  }

  addScore() {
    const handValue = getHandValue(this.hand);
    this.score = handValue;
  }
}

module.exports = Player;
