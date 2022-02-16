const { getHandValue } = require("../utils/helpers");
const Dealer = function () {
  this.hand = [];
  this.score = 0;
};

Dealer.prototype.cleanHand = function () {
  this.hand = [];
  this.score = 0;
};

Dealer.prototype.addScore = function () {
  const handValue = getHandValue(this.hand);
  this.score = handValue;
};

module.exports = Dealer;
