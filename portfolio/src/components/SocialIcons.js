import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SOCIAL_LINKS_TEXTS } from "../constants/texts";

const SocialIcons = () => {
  return (
    <IconsContainer>
      <a href={SOCIAL_LINKS_TEXTS.GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
      <a href={SOCIAL_LINKS_TEXTS.LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href={SOCIAL_LINKS_TEXTS.EMAIL} target="_blank" rel="noopener noreferrer">
        <HiOutlineMail />
      </a>
    </IconsContainer>
  );
};

export default SocialIcons;

/* Styled Components */
const IconsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  z-index: 1000;

  a {
    color: #8892b0;
    font-size: 1.5rem;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ffffff;
    }
  }
`;
