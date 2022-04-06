import React from "react";
import styled from "styled-components";

const PageDiv = styled.div`
  background: var(--color-background);
  color: var(--color-text);
  display: flex;
  justify-content: center;
  width: 80vw;
  margin: 2rem auto;
  section {
    margin: 1rem;
  }
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const Rules = () => {
  return (
    <PageDiv>
      <section>
        <h1>Blackjack rules</h1>
        <p>The goal is to beat the dealer's hand without going over 21.</p>
      </section>
    </PageDiv>
  );
};
export default Rules;
