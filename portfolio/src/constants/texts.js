import styled from "styled-components";


// Bold text component
export const Bold = styled.span`
  font-weight: bold;
  color: #ffffff;
`;

export const EXPERIENCES_TEXTS = {
    HEADER: "Experience",
};

export const EXPERIENCES_ITEMS = [
  {
    time: "01/2025 — Present",
    company: "Reality AI",
    role: "Software Developer Intern",
    description:
      "Built AI tools that analyze data and predict outcomes for business teams. Cleaned up data to train smarter models (25% more accurate!) and rolled them out using **Docker** so they can grow as needed.",
    tags: ["Java", "TensorFlow", "PyTorch", "Docker"],
    link: "https://www.realityai.tech/",
  },
  {
    time: "10/2024 - 2/2025",
    company: "OSCR AI",
    role: "Software Developer Intern",
    description:
      "Created a dashboard in React to track sales from partner ads, boosting conversions by 20%. Made the app fast and reliable with React tools, tested it with Postman, and shipped it 10% early by working closely with other teams.",
    tags: ["React", "Postman", "Chrome DevTools"],
    link: "https://www.oscr.tech/",
  },
  {
    time: "10/2024 - 12/2024",
    company: "OSCR AI",
    role: "Software Developer Intern",
    description:
      "Made an app where users upload PDFs and chat with them (by voice or text!). Used OpenAI and LangChain to let the AI read documents and answer questions, built the interface with React, and handled files smoothly on the backend.",
    tags: ["React", "TypeScript", "Storybook"],
    link: "https://www.oscr.tech/",
  },
  {
    time: "12/2023-02/2024",
    company: "SCEGC ENGINEERING DESIGN INSTITUTE",
    role: "Web Application Developer Intern",
    description: "Built a face-based timekeeping app where users clock in via a simple Streamlit interface. Used MTCNN and InceptionResnetV1 models to scan and match faces, then synced data with PostgreSQL to handle heavy updates—cutting timekeeping errors by 30%.",
    tags: ["Streamlit", "PyTorch", "MTCNN", "InceptionResnetV1", "PostgreSQL"],
  },
];

export const PROJECTS_TEXTS = {
    HEADER: "Projects",
};

export const PROJECTS_ITEMS = [
    {
      title: "Android Audio Media",
      description: "Built a Spotify-like music app for Android using Kotlin and Android Jetpack, featuring seamless navigation, favorites, and playback. Designed the UI with Jetpack Compose, synced data via Retrofit, stored favorites offline with Room, and powered music streaming with ExoPlayer.",
      tags: ["Kotlin", "Android Jetpack", "Jetpack Compose", "Hilt", "Retrofit", "Room", "ExoPlayer"],
    },
    {
      title: "E-commerce Flash Sell Platform",
      description: "Built a system to manage surges in online orders using Snowflake ID for unique order numbers and Redis to reduce database strain. Handled traffic spikes by spreading load with RocketMQ and CDN, sped up pages by 60%, and ensured smooth payments/inventory updates via SpringBoot locks. Stress-tested with JMeter to guarantee 10,000+ orders/second.",
      tags: ["Snowflake ID", "Redis", "SpringBoot", "RocketMQ", "CDN", "Sentinel", "JMeter"],
      link: "https://github.com/Bluelotus828/flash-sell.git",
    },
    {
      title: "Full-Stack SpringBoot Twitch Streaming Recommendation Web Application",
      description: "Created a one-stop web app to search Twitch streams, clips, and videos, with personalized recommendations. Designed a clean interface using React, connected to Twitch’s API for live data, and let users save favorites securely via OAuth2 login. Stored game info in AWS RDS (MySQL) and deployed publicly on AWS App Runner.",
      tags: ["React", "AWS RDS", "Twitch API", "OAuth2", "AWS App Runner"],
    },
    {
      title: "MINI SOCIAL MEDIA SERVICE",
      description: "Built a mobile-friendly social app with React frontend and Django backend for sharing posts, managing followers, and storing media. Sped up data retrieval using Redis/Memcached, handled traffic spikes with async tasks, and stored files via AWS S3. Stress-tested to handle 10,000+ requests/sec.",
      tags: ["React", "Django", "Redis", "Memcached", "AWS S3", "HBase", "RateLimiter", "CI/CD"],
      link: "https://github.com/Bluelotus828/my-twitter.git",
    },
];

export const CHATBOT_TEXTS = {
    WELCOME: "Hi, I'm Guanlin 2.0! Ask me anything! 👇",
    LIMIT_EXCEEDED: `Thanks so much for testing the chatbot function. I genuinely appreciate your interest in my portfolio webpage.\n\nDue to financial concerns (I do not want to be overcharged), I have limited the query to 1/day. If you are seeing this message, it means someone already used the function in 24 hours. If you want to test the chatbot, please schedule a meeting with me. I am more than happy to show you in the local environment!\n\nYou can ask a new question in: `,
    THANKS: "--Once again, thank you for exploring this portfolio site!",
    ERROR_MESSAGE: "Oops! Something went wrong.",
    PLACEHOLDER: "Ask me anything...",
};

export const SIDEBAR_TEXTS = {
    NAME: "Guanlin Yu",
    ROLE: "Software Engineer",
    DESC: "I build scalable, AI-driven full-stack applications that bridge intelligent backend systems with seamless user experiences.",
};
  
export const MENU_ITEMS = [
    { name: "ABOUT", id: "about" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "PROJECTS", id: "projects" },
];
  
export const SUGGESTED_QUESTIONS = [
    "Tell me about your experience.",
    "What projects have you worked on?",
    "Do you now or in the future need VISA sponsorship?",
];
  
export const SOCIAL_LINKS_TEXTS = {
    GITHUB_URL: "https://github.com/Bluelotus828",
    LINKEDIN_URL: "http://linkedin.com/in/guanlin-yu-737b7683",
    EMAIL: "mailto:yuguanlin828@gmail.com",
};

export const ABOUT_TEXTS = {
    SECTION_ID: "about",
    HEADER: "About Me",
    RESUME_BUTTON: "View Full Résumé",
    RESUME_LINK: "/resume.pdf",
    INTRO: (
        <>
            I’m a developer with a passion for creating <Bold>AI-driven</Bold>, <Bold>full-stack systems</Bold> and <Bold>scalable backend infrastructures</Bold>.
        I enjoy linking intelligent functionality with clean, interactive user interfaces—providing solutions that are
        both technically robust and intuitively designed.
        </>
    ),
    EDUCATION: "I am currently pursuing an M.S. in Computer Information Systems while interning as a Software Developer at Reality AI. In this role, I work with machine learning algorithms and AI-driven features, contributing to scalable, accurate systems that are deeply integrated into business workflows.",
    EXPERIENCE: "My past work spans a wide range of settings—from medical data tools and facial-recognition timekeeping systems to e-commerce flash sale platforms and marketing analytics dashboards. I have implemented everything from distributed ID systems and Redis-backed caching to React frontends and AI-powered PDF Q&A tools. I thrive in cross-functional teams, collaborating with designers, data scientists, and business stakeholders to deliver thoughtful, high-impact products.",
    LANGUAGES: (
        <>
          Bilingual native in <Bold>English</Bold> and <Bold>Chinese</Bold>, fluent in <Bold>Japanese</Bold> and{" "}
          <Bold>French</Bold>. I bring strong cross-cultural communication skills that help me collaborate effectively in
          diverse, international teams.
        </>
      ),
};

export const FOOTER_TEXT = [
  {
    id: 1,
    content: (
      <>
        Built this site from scratch with <strong>React</strong> + <strong>FastAPI</strong>. Styled it, animated it, hosted it.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        Runs on <strong>OpenAI</strong>. Lives on <strong>Vercel</strong> & <strong>Render</strong>.
      </>
    ),
  },
  {
    id: 3,
    content: <>Yep, even this site is part of my portfolio.</>,
  },
];

  