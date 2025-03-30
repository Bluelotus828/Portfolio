import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ABOUT_TEXTS } from "../constants/texts";


const About = React.forwardRef((props, ref) => {
  return (
    <Section ref={ref} id={ ABOUT_TEXTS.SECTION_ID }>
      <HeaderRow>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          { ABOUT_TEXTS.HEADER }
        </motion.h2>
        <ResumeButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(ABOUT_TEXTS.RESUME_LINK, "_blank")}
        >
          { ABOUT_TEXTS.RESUME_BUTTON }
        </ResumeButton>
      </HeaderRow>

      <p> { ABOUT_TEXTS.INTRO } </p>
      <p> { ABOUT_TEXTS.EDUCATION } </p>
      <p> { ABOUT_TEXTS.EXPERIENCE } </p>
      <p>{ ABOUT_TEXTS.LANGUAGES }</p>
    </Section>
  );
});

export default About;


/* Styled Components */
const Section = styled.section`
  margin-bottom: 80px;

  p:not(:last-child) {
    margin-bottom: 16px;
  }

  h2 {
    font-size: 2rem;
    color: #64ffda;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #8892b0;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResumeButton = styled(motion.button)`
  background-color: transparent;
  color: #64ffda;
  border: 1px solid #64ffda;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }
`;

