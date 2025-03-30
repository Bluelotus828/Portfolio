import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS_TEXTS, PROJECTS_ITEMS } from "../constants/texts";

const Projects = React.forwardRef((props, ref) => {
  return (
    <Section ref={ref} id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {PROJECTS_TEXTS.HEADER}
      </motion.h2>
      {PROJECTS_ITEMS.map((project, index) => {
        const CardContent = (
          <MotionCard
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            clickable={!!project.link}
          >
            <ProjectHeader>
              <h3>{project.title}</h3>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt />
                </a>
              )}
            </ProjectHeader>
            <p>{project.description}</p>
            <Tags>
              {project.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </Tags>
          </MotionCard>
        );

        return project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" key={index}>
            {CardContent}
          </a>
        ) : (
          <div key={index}>{CardContent}</div>
        );
      })}
    </Section>
  );
});

export default Projects;

/* Styled Components */
const Section = styled.section`
  margin-bottom: 80px;

  h2 {
    font-size: 2rem;
    color: #64ffda;
    margin-bottom: 20px;
  }
`;

const MotionCard = styled(motion.div)`
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  transition: transform 0.3s, background 0.3s;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  &:hover {
    background: rgba(53, 79, 115, 0.2);
  }

  h3 {
    color: #ccd6f6;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    color: #8892b0;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
