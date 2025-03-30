import React from "react";
import styled from "styled-components";
import { FOOTER_TEXT } from "../constants/texts";

const Footer = () => {
  return (
    <FooterContainer>
      {FOOTER_TEXT.map((line) => (
        <Line key={line.id}>{line.content}</Line>
      ))}
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  color: #8892b0;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.7;
`;

const Line = styled.p`
  margin: 4px 0;

  strong {
    color: #64ffda;
    font-weight: 600;
  }
`;