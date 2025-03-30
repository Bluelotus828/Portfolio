import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: #0a192f;
    color: #ccd6f6;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: #64ffda;
    transition: 0.3s;

    &:hover {
      color: #ffffff;
    }
  }
`;

export default GlobalStyles;
