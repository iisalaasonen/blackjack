import styled, { keyframes } from "styled-components";

const showButton = keyframes`
    0% {transform: translate(0, 50px)}
    80% {transform: translate(0, -10px)}
    100% {}
`;

export const CommonButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  background: ${(props) => props.background};
  color: var(--color-text);
  border: 1px solid #fff;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  animation-name: ${showButton};
  animation-duration: 0.5s;
  animation-timing-function: linear;
`;
