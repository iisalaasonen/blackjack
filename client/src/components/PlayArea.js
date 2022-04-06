import React, { useState } from "react";
import Dealer from "./Dealer";
import Player from "./Player";
import Card from "./Card";
import styled, { keyframes } from "styled-components";
import { CommonButton } from "../common/CommonButton";
import playService from "../services/play";

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

const showStatus = keyframes`
0% {
  font-size: 1rem;
}
100% {
  font-size: 2rem;
}
`;

const Status = styled.p`
  animation-name: ${showStatus};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

const PlayArea = () => {
  const [player, setPlayer] = useState({});
  const [dealer, setDealer] = useState({});
  const [newGame, setNewGame] = useState(false);
  const [gameStatus, setGameStatus] = useState();

  const fetchCards = async () => {
    try {
      const data = await playService.newGame();
      setPlayer(data.player);
      setGameStatus(data.player.handStatus);
      setDealer(data.dealer);
      if (data.player.handStatus !== "PLAYING") {
        setNewGame(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlay = (e) => {
    e.preventDefault();
    fetchCards().catch((e) => console.log(e));
    setNewGame(!newGame);
  };

  const handleHit = async (e) => {
    e.preventDefault();
    try {
      const data = await playService.hit();
      setPlayer(data.player);
      setGameStatus(data.player.handStatus);
      setDealer(data.dealer);
      if (data.player.handStatus !== "PLAYING") {
        setNewGame(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStand = async (e) => {
    e.preventDefault();
    try {
      const data = await playService.stand();
      setPlayer(data.player);
      setGameStatus(data.player.handStatus);
      setDealer(data.dealer);
      if (data.player.handStatus !== "PLAYING") {
        setNewGame(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Dealer dealer={dealer} gameStatus={gameStatus} />
        <CenterDiv>
          <Card facedown={true} />
          <StatusDiv>
            {player?.handStatus !== "PLAYING" ? (
              <Status>{player.handStatus}</Status>
            ) : (
              ""
            )}
          </StatusDiv>
        </CenterDiv>
        <Player
          player={player}
          gameStatus={gameStatus}
          handleHit={handleHit}
          handleStand={handleStand}
        />
        <div>
          {!newGame && (
            <CommonButton background="#00802b" onClick={handlePlay}>
              DEAL
            </CommonButton>
          )}
        </div>
      </Container>
    </>
  );
};

export default PlayArea;
