import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
    padding: 0;
    margin: 0;
}
html {
  --color-text: #fff;
  --color-background: hsl(210deg, 30%, 8%);
  --color-background-nav: hsl(210deg, 30%, 8%);
  --color-primary: #002f06;
  --color-secondary: #1c6000;
  font-size: 16px;
  @media (min-width: 600px) {
    font-size: 3vw;
}
@media (min-width: 800px) {
  font-size: 24px;
}
body {
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  background: var(--color-primary);
}
}
`;

export default GlobalStyle;
