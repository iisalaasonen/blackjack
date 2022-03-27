import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

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
          <button onClick={handleHit}>HIT</button>
          <button onClick={handleStand}>STAND</button>
        </ButtonsDiv>
      )}
    </div>
  );
};
export default Player;
