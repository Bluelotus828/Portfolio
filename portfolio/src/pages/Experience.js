import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { EXPERIENCES_TEXTS, EXPERIENCES_ITEMS } from "../constants/texts";


const Experience = React.forwardRef((props, ref) => {
  return (
    <Section ref={ref} id="experience">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        { EXPERIENCES_TEXTS.HEADER }
      </motion.h2>
      {EXPERIENCES_ITEMS.map((exp, index) => (
        <ExperienceItem
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Time>{exp.time}</Time>
          <Content>
            <Company>
              <span>
                {exp.role} · {exp.company}
              </span>
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt />
                </a>
              )}
            </Company>
            <Description>{exp.description}</Description>
            <Tags>
              {exp.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </Tags>
          </Content>
        </ExperienceItem>
      ))}
    </Section>
  );
});

export default Experience;


/* Styled Components */
const Section = styled.section`
  margin-bottom: 80px;

  h2 {
    font-size: 2rem;
    color: #64ffda;
    margin-bottom: 20px;
  }
`;

const ExperienceItem = styled(motion.div)`
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;

  &:hover {
    background: rgba(53, 79, 115, 0.2);
  }
`;

const Time = styled.div`
  font-size: 0.9rem;
  color: #8892b0;
  white-space: nowrap;
  min-width: 150px;
`;

const Content = styled.div`
  flex: 1;
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ccd6f6;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;

  a {
    color: #64ffda;
    font-size: 0.9rem;
    margin-left: 10px;
    transition: color 0.3s;

    &:hover {
      color: #ffffff;
    }
  }

  svg {
    margin-left: 5px;
    font-size: 0.8rem;
  }
`;

const Description = styled.p`
  color: #8892b0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 10px;
  
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  white-space: nowrap;
  transition: background 0.3s;

  &:hover {
    background: rgba(100, 255, 218, 0.2);
  }
`;
