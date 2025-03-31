import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { CHATBOT_TEXTS, SUGGESTED_QUESTIONS } from "../constants/texts";
import { API_URL } from "../constants/config";

const ChatBot = ({ isMobile, onClose }) => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(""); // Tracks user input
  const [isTyping, setIsTyping] = useState(false); // Indicates AI is typing
  const [timeRemaining, setTimeRemaining] = useState(null); // Tracks time left for next query "timeRemaining" cannot be deleted!
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Typewriter effect for displaying bot responses gradually
  const typeEffect = (text, callback) => {
    let i = 0;
    let displayedText = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        displayedText += text[i];
        i++;
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, text: displayedText },
          ];
        });
      } else {
        clearInterval(interval);
        callback && callback(); // Enable input & suggested questions after completion
      }
    }, 20); // Faster type effect speed
  };

  // Auto-scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (timeRemaining) {
      console.log(`Time remaining: ${timeRemaining}`);
    }
  }, [timeRemaining]);

  const handleSend = async (message) => {
    const query = typeof message === "string" ? message : input.trim(); // Ensure query is a string

    if (!query) return; // Prevent empty input from submitting

    // Append user message to chat history
    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input field
    setIsTyping(true); // Disable input & suggested questions

    try {
      const response = await axios.post(API_URL, { query });

      if (response.data.answer === "LIMIT_EXCEEDED") {
        setTimeRemaining(response.data.time_remaining);
        setMessages((prev) => [
          ...prev,
          {
            sender: "error",
            text: CHATBOT_TEXTS.LIMIT_EXCEEDED,
            timeLeft: response.data.time_remaining,
          },
          {
            sender: "error",
            text: CHATBOT_TEXTS.THANKS,
          },
        ]);
        setIsTyping(false); // Enable input again since this is a static error message
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "" }]); // Add an empty message first
        typeEffect(response.data.answer, () => setIsTyping(false)); // Enable input after typewriter effect
        setTimeRemaining(null);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: CHATBOT_TEXTS.ERROR_MESSAGE }]);
      setIsTyping(false);
    }
  };

  return (
    <ChatWindow $isMobile={isMobile}>
      {/* Close button – only visible in mobile view */}
      {isMobile && (
        <CloseButton onClick={onClose}>✕</CloseButton>
      )}
      
      <ChatHeader>
        <div>{CHATBOT_TEXTS.WELCOME}</div>
      </ChatHeader>
      
      <Messages>
        {messages.map((msg, idx) => (
          <Message key={idx} $isUser={msg.sender === "user"} $isError={msg.sender === "error"}>
            {msg.text}
            {msg.sender === "error" && msg.timeLeft && (
              <TimeLeft>⏳ {msg.timeLeft}</TimeLeft>
            )}
          </Message>
        ))}
        {isTyping && <TypingIndicator>...</TypingIndicator>}
        <div ref={messagesEndRef} /> {/* Scroll to this element */}
      </Messages>

      {/* Suggested questions for quick replies */}
      <SuggestedQuestions>
        {SUGGESTED_QUESTIONS.map((question, idx) => (
          <QuestionButton 
            key={idx} 
            onClick={() => handleSend(question)}
            disabled={isTyping} // Disable during AI response
          >
            {question}
          </QuestionButton>
        ))}
      </SuggestedQuestions>

      {/* User input section */}
      <InputArea>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          disabled={isTyping} // Disable input field when AI is typing
        />
        <button onClick={() => handleSend()} disabled={isTyping || input.trim() === ""}>
          Send
        </button>
      </InputArea>
    </ChatWindow>
  );
};

export default ChatBot;

/* Styled Components */
const ChatWindow = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  background: #112240;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: ${props => props.$isMobile ? '0 5px 20px rgba(0, 0, 0, 0.3)' : 'none'};
  
  /* Slight size adjustment for mobile view */
  ${props => props.$isMobile && `
    max-width: 100%;
    height: 400px;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #8892b0;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: #ffffff;
  }
`;

const ChatHeader = styled.div`
  background: #1d293e;
  padding: 10px 15px;
  border-bottom: 1px solid #233554;
  font-weight: 600;
  color: #64ffda;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  max-height: 220px;
  scroll-behavior: smooth;
`;

const Message = styled.div`
  text-align: ${({ $isUser }) => ($isUser ? "right" : "left")};
  color: ${({ $isError }) => ($isError ? "#FF7F7F" : "white")}; /* Soft red for error messages */
  font-size: ${({ $isError }) => ($isError ? "0.9rem" : "1rem")};
  margin-bottom: 10px;
`;

const TimeLeft = styled.span`
  color: #FFA07A; /* Highlight countdown timer in orange */
  font-weight: bold;
  margin-left: 5px;
`;

const TypingIndicator = styled.div`
  color: #64ffda;
  font-style: normal;
  padding: 5px;
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  gap: 6px;
`;

const QuestionButton = styled.button`
  background: rgba(100, 255, 218, 0.2);
  color: #64ffda;
  border: none;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")}; /* Dim button when disabled */
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")}; /* Disable interaction */

  &:hover {
    background: rgba(100, 255, 218, 0.4);
  }
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #233554;
  padding: 8px;
  background: #112240;

  input {
    flex: 1;
    padding: 6px 10px;
    border: none;
    background: #0a192f;
    color: white;
    border-radius: 4px;
  }

  button {
    background: #64ffda;
    border: none;
    padding: 6px 12px;
    margin-left: 8px;
    min-width: 60px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 0.9rem;
    color: #0a192f;
    font-weight: 600;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background: #4cd9c4;
    }

    &:disabled {
      background: #8892b0;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;