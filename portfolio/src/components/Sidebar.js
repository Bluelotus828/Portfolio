import React, { useState } from "react";
import styled from "styled-components";
import ChatBot from "./ChatBot";
import { SIDEBAR_TEXTS, MENU_ITEMS } from "../constants/texts";

const Sidebar = ({ activeSection, scrollToSection, refs, isMobile }) => {
  // Default to showing chatbot on desktop; hidden on mobile
  const [showChat, setShowChat] = useState(!isMobile);

  return (
    <SidebarContainer>
      <h1>{SIDEBAR_TEXTS.NAME}</h1>
      <h2>{SIDEBAR_TEXTS.ROLE}</h2>
      <p>{SIDEBAR_TEXTS.DESC}</p>

      {/* Navigation menu – visible only on desktop view */}
      {!isMobile && (
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
      )}

      {/* ChatBot toggle button – shown on both mobile and desktop, but positioned differently */}
      <ChatBotWrapper isMobile={isMobile}>
        <ChatToggleButton onClick={() => setShowChat(!showChat)}>
          💬
        </ChatToggleButton>
      </ChatBotWrapper>

      {/* ChatBot display – inline on desktop, floating on mobile */}
      {showChat && (
        isMobile ? (
          <FloatingChatContainer>
            <ChatBot isMobile={isMobile} onClose={() => setShowChat(false)} />
          </FloatingChatContainer>
        ) : (
          <ChatBot isMobile={isMobile} />
        )
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

/* Styled Components */
const SidebarContainer = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  @media (min-width: 769px) {
    padding-top: 80px;
  }

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
    padding: 10px 0;

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
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
  padding: 5px 0;

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
  
  ${props => props.isMobile && `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    margin-top: 0;
  `}
`;

const ChatToggleButton = styled.button`
  background: #64ffda;
  color: #0a192f;
  border: none;
  padding: 8px 12px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

const FloatingChatContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 400px) {
    width: calc(100% - 40px);
    right: 20px;
  }
`;
