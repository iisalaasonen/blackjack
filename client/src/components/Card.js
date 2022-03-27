import { Redirect } from "react-router/cjs/react-router.min";
import styled from "styled-components";
import cardback from "../images/cardback.png";

const getSuitCode = (suit) => {
  switch (suit) {
    case "Hearts":
      return 9829;
    case "Diamonds":
      return 9830;
    case "Spades":
      return 9824;
    case "Clubs":
      return 9827;
    default:
      break;
  }
};

const getSuitColor = (suit) => {
  if (suit === "Hearts" || suit === "Diamonds") return "red";
  if (suit === "Spades" || suit === "Clubs") return "black";
};

const PlayingCard = styled.div`
  position: relative;
  height: 125px;
  width: 85px;
  border-radius: 5px;
  background: #fff;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const Suit = styled.span`
  position: absolute;
  top: 0px;
  left: 5px;
  color: ${(props) => props.color};
  font-size: 0.8rem;
  &::before {
    content: "${(props) => props.value}";
    display: block;
    transform: translate(0, 5px);
  }
`;

const UpsideSuit = styled.span`
  position: absolute;
  bottom: 0px;
  right: 5px;
  color: ${(props) => props.color};
  transform: rotateX(180deg);
  font-size: 0.8rem;
  &::before {
    content: "${(props) => props.value}";
    display: block;
    transform: translate(0, -5px);
    transform: scaleX(-1);
  }
`;

const Card = ({ facedown, value, suit }) => {
  if (facedown) {
    return (
      <PlayingCard>
        <img src={cardback} alt="playing card back" />
      </PlayingCard>
    );
  }
  const suitCode = getSuitCode(suit);
  const suitColor = getSuitColor(suit);
  return (
    <PlayingCard>
      <Suit value={value} color={suitColor}>
        {String.fromCharCode(suitCode)}
      </Suit>
      <UpsideSuit value={value} color={suitColor}>
        {String.fromCharCode(suitCode)}
      </UpsideSuit>
    </PlayingCard>
  );
};

export default Card;
