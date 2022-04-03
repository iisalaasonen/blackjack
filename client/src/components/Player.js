import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { CommonButton } from "../common/CommonButton";

export const CardDiv = styled.div`
  background: var(--color-background);
  display: flex;
  gap: 20px;
`;

const ButtonsDiv = styled.div`
  display: flex;
`;

const Player = ({ player, gameStatus, handleHit, handleStand }) => {
  return (
    <div>
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
    </div>
  );
};
export default Player;
