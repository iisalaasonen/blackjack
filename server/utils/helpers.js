const oneCardValue = (value) => {
  if (value === "A") {
    return 1;
  }
  if (value === "K" || value === "Q" || value === "J") {
    return 10;
  }
  return parseInt(value);
};

const cardReducer = (acc, curr) => {
  const value = curr.value;
  const numberValue = oneCardValue(value);
  acc += numberValue;
  return acc;
};

const getHandValue = (hand) => {
  const handValue = hand.reduce(cardReducer, 0);
  const handWithAce = hand.find((hand) => hand.value === "A");
  //if hand got at least one ace
  if (handWithAce && handValue <= 11) {
    //add remaining 10 to add that one ace value to 11
    return handValue + 10;
  }
  return handValue;
};

module.exports = {
  getHandValue,
};
