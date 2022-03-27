import React from "react";
import Card from "./Card";
import { CardDiv } from "./Player";

const Dealer = ({ dealer }) => {
  console.log("dealer ", dealer);

  return (
    <div>
      <h1>DEALER</h1>
      <p>DEALER SCORE: {dealer?.score}</p>
      <CardDiv>
        {dealer?.hand?.map((hand, idx) => {
          return <Card key={idx} suit={hand.suit} value={hand.value} />;
        })}
      </CardDiv>
    </div>
  );
};

export default Dealer;
