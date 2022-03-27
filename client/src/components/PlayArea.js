import React, { useState, useEffect } from "react";
import Dealer from "./Dealer";
import Player from "./Player";
import Card from "./Card";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border: 1px solid white;
  margin: 3rem auto;
  padding: 2rem;
  width: 50%;
  height: fit-content;
  color: var(--color-text);
  background: var(--color-background);
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 20px 0;
`;

const StatusDiv = styled.div`
  margin: auto;
`;

const PlayArea = () => {
  const [player, setPlayer] = useState({});
  const [dealer, setDealer] = useState({});
  const [newGame, setNewGame] = useState(false);
  const [gameStatus, setGameStatus] = useState();

  const fetchCards = async () => {
    try {
      const response = await axios.get("/newGame");
      console.log("response ", response);
      setPlayer(response.data.player);
      setGameStatus(response.data.player.handStatus);
      setDealer(response.data.dealer);
      if (response.data.player.handStatus !== "PLAYING") {
        setNewGame(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlay = () => {
    fetchCards().catch((e) => console.log(e));
    setNewGame(!newGame);
  };

  const handleHit = async () => {
    try {
      const response = await axios.get("/hit");
      setPlayer(response.data.player);
      setGameStatus(response.data.player.handStatus);
      setDealer(response.data.dealer);
      if (response.data.player.handStatus !== "PLAYING") {
        setNewGame(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStand = async () => {
    try {
      const response = await axios.get("/stand");
      setPlayer(response.data.player);
      setGameStatus(response.data.player.handStatus);
      setDealer(response.data.dealer);
      if (response.data.player.handStatus !== "PLAYING") {
        setNewGame(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("player ", player);
  console.log("dealer ", dealer);
  console.log("new game ", newGame);

  return (
    <Container>
      <Dealer dealer={dealer} gameStatus={gameStatus} />
      <CenterDiv>
        <Card facedown={true} />
        <StatusDiv>
          {player?.handStatus !== "PLAYING" && player.handStatus}
        </StatusDiv>
      </CenterDiv>
      <Player
        player={player}
        gameStatus={gameStatus}
        handleHit={handleHit}
        handleStand={handleStand}
      />
      <div>{!newGame && <button onClick={handlePlay}>DEAL</button>}</div>
    </Container>
  );
};

export default PlayArea;
