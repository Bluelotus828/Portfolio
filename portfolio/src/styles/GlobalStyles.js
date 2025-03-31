import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  html, body {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  body {
    background: #0a192f;
    color: #ccd6f6;
    line-height: 1.5;
    min-height: 100vh;
    display: block;
    position: relative;
  }
  
  #root {
    width: 100%;
    min-height: 100vh;
    position: relative;
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
