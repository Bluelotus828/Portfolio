import React, { useState } from "react";
import styled from "styled-components";
import ChatBot from "./ChatBot";
import { SIDEBAR_TEXTS, CHATBOT_TEXTS, MENU_ITEMS } from "../constants/texts";


const Sidebar = ({ activeSection, scrollToSection, refs }) => {
  const [showChat, setShowChat] = useState(true); // Default state: Chat window is open

  return (
    <SidebarContainer>
      <h1>{SIDEBAR_TEXTS.NAME}</h1>
      <h2>{SIDEBAR_TEXTS.ROLE}</h2>
      <p>{SIDEBAR_TEXTS.DESC}</p>

      {/* Navigation Menu */}
      <NavMenu>
        {MENU_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            className={activeSection === item.id ? "active" : ""}
            onClick={() => scrollToSection(refs[`${item.id}Ref`])}
          >
            <div className="underline-container">
              {activeSection === item.id && <div className="underline"></div>}
            </div>
            <span>{item.name}</span>
          </NavItem>
        ))}
      </NavMenu>

      {/* ChatBot section */}
      <ChatBotWrapper>
        <ChatToggleButton onClick={() => setShowChat(!showChat)}>💬</ChatToggleButton>
        <SubTitle>{ CHATBOT_TEXTS.WELCOME }</SubTitle>
      </ChatBotWrapper>

      {showChat && <ChatBot />} {/* Show ChatBot only if toggled on */}
    </SidebarContainer>
  );
};

export default Sidebar;


/* Styled Components */
const SidebarContainer = styled.nav`
  position: fixed;
  height: 100vh;
  top: 100px;
  left: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
  }

  p {
    font-size: 1rem;
    color: #8892b0;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    left: 20px;
    top: 20px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #8892b0;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover,
  &.active {
    color: #ffffff;
  }

  .underline-container {
    width: 40px;
    height: 2px;
    position: relative;
    background: #233554;
    flex-shrink: 0;
  }

  .underline {
    height: 2px;
    background: #ffffff;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
  }

  &.active .underline-container {
    background: transparent;
    width: 80px;
  }

  &.active .underline {
    width: 100%;
  }
`;

const ChatBotWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChatToggleButton = styled.button`
  background: #64ffda;
  color: #0a192f;
  border: none;
  padding: 8px 12px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.2rem;
`;

const SubTitle = styled.div`
  color: #64ffda;
  font-size: 0.95rem;
  font-weight: 600;
`;
