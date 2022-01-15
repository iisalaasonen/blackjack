const Dealer = function () {
  this.hand = [];
  this.score = 0;
};

Dealer.prototype.cleanHand = function () {
  this.hand = [];
  this.score = 0;
};

module.exports = new Dealer();
