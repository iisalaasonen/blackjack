const playRouter = require("express").Router();
const { getHandValue } = require("../utils/helpers");
const DECK = require("../models/cards");
const PLAYER = require("../models/player");
const DEALER = require("../models/dealer");

playRouter.get("/newGame", (request, response) => {
  DECK.buildDeck();
  DECK.shuffleDeck();
  PLAYER.cleanHand();
  DEALER.cleanHand();
  for (let i = 0; i < 2; i++) {
    PLAYER.hand[i] = DECK.cards.pop();
    DEALER.hand[i] = DECK.cards.pop();
  }
  const handValue = getHandValue(PLAYER.hand);
  PLAYER.score = handValue;
  const dealerHandValue = getHandValue(DEALER.hand);
  DEALER.score = dealerHandValue;
  //if player status stays playing reveal only face up card of dealer
  let res = {
    player: PLAYER,
    dealer: DEALER.hand[0],
  };
  if (PLAYER.score === 21) {
    //show dealer hand
    res = { ...res, dealer: DEALER.hand };
    //if dealer also has a blackjack it's a tie else player wins
    if (DEALER.score === 21) {
      PLAYER.handStatus = "PUSH";
    } else {
      PLAYER.handStatus = "WIN";
    }
  } else {
    //check if dealer has a blackjack
    if (DEALER.score === 21) {
      PLAYER.handStatus = "LOSE";
      //show dealer hand
      res = { ...res, dealer: DEALER.hand };
    } else {
      PLAYER.handStatus = "PLAYING";
    }
  }
  response.json(res);
});

playRouter.get("/hit", (request, response) => {
  if (PLAYER.handStatus !== "PLAYING")
    return response.status(400).json({ error: "HAND IS ALREADY PLAYED" });
  const newCard = DECK.cards.pop();
  PLAYER.hand.push(newCard);
  const handValue = getHandValue(PLAYER.hand);
  PLAYER.score = handValue;
  let res = {
    player: PLAYER,
    dealer: DEALER.hand[0],
  };
  if (handValue > 21) {
    PLAYER.handStatus = "BUSTED";
    //player busted, show both dealer cards regardless
    res = { ...res, dealer: DEALER.hand };
  } else if (handValue === 21) {
    //get dealer hand value
    const dealerHandValue = getHandValue(DEALER.hand);
    DEALER.score = dealerHandValue;
    //dealer takes new card if value is under 17
    while (DEALER.score < 17) {
      const newCard = DECK.cards.pop();
      DEALER.hand.push(newCard);
      const dealerHandValue = getHandValue(DEALER.hand);
      DEALER.score = dealerHandValue;
    }
    //if dealer also gets 21 it's a tie
    if (DEALER.score === 21) {
      PLAYER.handStatus = "PUSH";
    } else {
      PLAYER.handStatus = "WIN";
    }
  } else {
    //keep playing
    PLAYER.handStatus = "PLAYING";
  }
  response.json(res);
});

playRouter.get("/stand", (request, response) => {
  //come here only if player status is PLAYER.status === PLAYING
  if (PLAYER.handStatus !== "PLAYING")
    return response.status(400).json({ error: "HAND IS ALREADY PLAYED" });
  const dealerHandValue = getHandValue(DEALER.hand);
  DEALER.score = dealerHandValue;
  //dealer takes new card if value is under 17
  while (DEALER.score < 17) {
    const newCard = DECK.cards.pop();
    DEALER.hand.push(newCard);
    const dealerHandValue = getHandValue(DEALER.hand);
    DEALER.score = dealerHandValue;
  }
  if (DEALER.score >= 17 && DEALER.score <= 21) {
    //compare with player hand value
    if (DEALER.score > PLAYER.score) {
      PLAYER.handStatus = "LOSE";
    } else if (DEALER.score === PLAYER.handStatus) {
      PLAYER.handStatus = "PUSH";
    } else {
      PLAYER.handStatus = "WIN";
    }
  } else {
    //else dealer busted
    PLAYER.handStatus = "WIN";
  }
  response.json({ dealer: DEALER, player: PLAYER });
});

/*
playRouter.get("/double down", (request, response) => {
});

playRouter.get("/split", (request, response) => {
  
});
*/
module.exports = playRouter;
