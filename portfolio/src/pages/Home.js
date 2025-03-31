import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);

  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  // Handle window resize and initial setup
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Force scroll to top on initial load
    window.scrollTo(0, 0);

    // Initialize mobile state
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse tracking for background glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Track scroll position to update active section
  useEffect(() => {
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

  // Scroll to a specific section smoothly
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const yOffset = isMobile ? -20 : -80;
      const y = ref.current.offsetTop + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Container>
      {/* Background glow effect for desktop */}
      {!isMobile && (
        <GlowEffect
          animate={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        />
      )}

      {/* Page layout */}
      <LayoutWrapper>
        {/* Fixed sidebar (mobile becomes relative) */}
        <SidebarSection isMobile={isMobile}>
          <Sidebar
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            refs={{ aboutRef, experienceRef, projectsRef }}
            isMobile={isMobile}
          />
        </SidebarSection>

        {/* Scrollable main content */}
        <MainSection isMobile={isMobile}>
          <div ref={aboutRef} id="about">
            <About />
          </div>
          <Experience ref={experienceRef} />
          <Projects ref={projectsRef} />
          <Footer />
        </MainSection>
      </LayoutWrapper>

      {/* Social media icons */}
      <SocialIcons />
    </Container>
  );
};

export default Home;

/* Styled Components */
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #0a192f;
  position: relative;
  overflow-x: hidden;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Fixed sidebar (or relative on mobile)
const SidebarSection = styled.div`
  width: 35%;
  position: ${props => props.isMobile ? 'relative' : 'fixed'};
  top: 0;
  left: 0;
  height: ${props => props.isMobile ? 'auto' : '100vh'};
  overflow-y: auto;

  /* Left padding for large screens */
  @media (min-width: 769px) {
    padding-left: 80px;
  }

  @media (max-width: 1200px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    position: relative;
    height: auto;
  }
`;

// Scrollable main content
const MainSection = styled.div`
  width: 60%;
  padding: 80px;

  /* More left margin to space from sidebar on large screens */
  @media (min-width: 1201px) {
    margin-left: 42%;
  }

  @media (max-width: 1200px) {
    width: 60%;
    padding: 30px;
    margin-left: ${props => props.isMobile ? '0' : '40%'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    margin-left: 0;
  }
`;
