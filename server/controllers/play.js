const playRouter = require("express").Router();
const GAME = require("../models/game");

playRouter.get("/newGame", (request, response) => {
  GAME.newGame();
  GAME.dealCards();
  GAME.player.addScore();
  GAME.dealer.addScore();
  const gameStatus = GAME.gameStatusAfterDeal();
  response.json(gameStatus);
});

playRouter.get("/hit", (request, response) => {
  if (GAME.player.handStatus !== "PLAYING")
    return response.status(400).json({ error: "HAND IS ALREADY PLAYED" });
  GAME.hit();
  GAME.player.addScore();
  const gameStatus = GAME.gameStatus();
  response.json(gameStatus);
});

playRouter.get("/stand", (request, response) => {
  //come here only if player status is PLAYER.status === PLAYING
  if (GAME.player.handStatus !== "PLAYING") {
    return response.status(400).json({ error: "HAND IS ALREADY PLAYED" });
  }
  const gameStatus = GAME.stand();
  response.json(gameStatus);
});

/*
playRouter.get("/double down", (request, response) => {
});

playRouter.get("/split", (request, response) => {
  
});
*/
module.exports = playRouter;
