const player = () => {
  hand = [];
  handStatus = "";
  score = 0;
  function cleanHand() {
    this.hand = [];
    this.handStatus = "";
    this.score = 0;
  }
  return {
    hand,
    handStatus,
    score,
    cleanHand,
  };
};

module.exports = player();
