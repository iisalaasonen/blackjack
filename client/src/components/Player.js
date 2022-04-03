import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { CommonButton } from "../common/CommonButton";

export const PlayerDiv = styled.div`
  width: 100%;
  text-align: center;
`;

export const CardDiv = styled.div`
  background: var(--color-background);
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 0.5rem 0;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Player = ({ player, gameStatus, handleHit, handleStand }) => {
  return (
    <PlayerDiv>
      <CardDiv>
        {player?.hand?.map((hand, idx) => {
          return <Card key={idx} suit={hand.suit} value={hand.value} />;
        })}
      </CardDiv>
      <p>SCORE: {player?.score}</p>
      <h1>PLAYER</h1>
      {gameStatus === "PLAYING" && (
        <ButtonsDiv>
          <CommonButton background="#00802b" onClick={handleHit}>
            HIT
          </CommonButton>
          <CommonButton background="#990000" onClick={handleStand}>
            STAND
          </CommonButton>
        </ButtonsDiv>
      )}
    </PlayerDiv>
  );
};
export default Player;
