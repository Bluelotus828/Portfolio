import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion"; // Used for mouse hover glow effect
import Sidebar from "../components/Sidebar";
import SocialIcons from "../components/SocialIcons";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Footer from "../components/Footer";

const Home = () => {
  // State to track the active section based on scrolling
  const [activeSection, setActiveSection] = useState("about");

  // State to store the current mouse position for the glow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // References for different sections on the page
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    // Listen to `window.scroll` instead of `MainContent`
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.2;

      if (projectsRef.current && scrollPosition >= projectsRef.current.offsetTop - 200) {
        setActiveSection("projects");
      } else if (experienceRef.current && scrollPosition >= experienceRef.current.offsetTop - 200) {
        setActiveSection("experience");
      } else {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Track mouse movement for hover glow effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smoothly scrolls to the selected section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const yOffset = -80; // Offset to prevent section from sticking too high
      const y = ref.current.offsetTop + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Container>
      {/* Glow Hover Effect */}
      <GlowEffect
        animate={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      />
      
      {/* Sidebar navigation */}
      <SidebarWrapper>
        <Sidebar
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          refs={{ aboutRef, experienceRef, projectsRef }}
        />
      </SidebarWrapper>

      {/* Main content area */}
      <MainContent>
        <ContentWrapper>
          <About ref={aboutRef} />
          <Experience ref={experienceRef} />
          <Projects ref={projectsRef} />
        </ContentWrapper>
        <Footer />
      </MainContent>

      {/* Social media icons */}
      <SocialIcons />
    </Container>
    
  );
};

export default Home;

/* Styled Components */
const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background: #0a192f;
  color: #ccd6f6;
  position: relative;
`;

const GlowEffect = styled(motion.div)`
  position: fixed;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.15) 10%, rgba(10, 25, 47, 0.6) 60%);
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
  transition: all 0.2s ease-out;
`;

const SidebarWrapper = styled.div`
  width: 40vw;
  position: fixed;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 100vw;
    height: auto;
    position: relative;
    padding: 30px;
  }
`;

const MainContent = styled.div`
  width: 55vw;
  height: 100vh;
  margin-top: 5vw;
  margin-left: 40vw;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;

  @media (max-width: 1024px) {
    width: 100vw;
    margin-left: 0;
    padding: 30px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
