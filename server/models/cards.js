const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const Deck = function () {
  this.cards = [];
};

Deck.prototype.buildDeck = function () {
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const cards = [];
  values.forEach((value) => {
    suits.forEach((suit) => {
      cards.push({ value, suit });
    });
  });
  this.cards = cards;
};

Deck.prototype.shuffleDeck = function () {
  shuffleArray(this.cards);
};

module.exports = new Deck();
