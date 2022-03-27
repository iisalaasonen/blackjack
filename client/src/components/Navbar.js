import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background: var(--color-background-nav);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #fff;
`;

const NavBar = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 10px;
    padding-right: 20px;
  }
  ul li {
    padding: 10px;
  }
`;
//letter-spacing
const NavLink = styled(Link)`
  color: var(--color-text);
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--color-text);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  &:hover::before {
    transform: scaleX(1);
  }
  &:hover {
    letter-spacing: 5px;
  }
`;

const Navbar = () => {
  return (
    <Header>
      <div>BLACKJACK</div>
      <NavBar>
        <ul>
          <li>
            <NavLink to="/">Play</NavLink>
          </li>
          <li>
            <NavLink to="/rules">Rules</NavLink>
          </li>
        </ul>
      </NavBar>
    </Header>
  );
};

export default Navbar;
