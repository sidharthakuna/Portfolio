import { DiJava, DiMysql, DiDocker, DiHtml5 } from "react-icons/di";
import {
  SiSpringboot,
  SiPython,
  SiJavascript,
  SiPostgresql,
  SiReact,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { TbApi, TbShieldLock } from "react-icons/tb";

import aiNoiseRemoverImg from "@/assets/ai-noise-remover.png";
import resumeForgeImg from "@/assets/resumeforge.png";

export const PROJECTS = [
  {
    id: "resume-forge",
    title: "ResumeForge",
    tagline: "Full-stack AI ATS resume builder & career studio with pixel-perfect PDF rendering.",
    description:
      "A modern, full-stack, AI-powered ATS resume builder and career studio. Create, optimize, tailor, and export job-winning resumes in seconds with intelligent AI engine and pixel-perfect PDF rendering. Includes 10+ curated professional templates, ATS scoring analysis, and enterprise-grade stateless JWT security.",
    image: resumeForgeImg,
    featured: true,
    tech: [
      { label: "Java 21", icon: <DiJava color="#E76F00" size={16} /> },
      { label: "Spring Boot 3.4", icon: <SiSpringboot color="#6DB33F" size={14} /> },
      { label: "PostgreSQL", icon: <SiPostgresql color="#4169E1" size={15} /> },
      { label: "React 19", icon: <SiReact color="#61DAFB" size={15} /> },
      { label: "TypeScript", icon: <SiTypescript color="#3178C6" size={14} /> },
      { label: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" size={15} /> },
      { label: "Docker", icon: <DiDocker color="#2496ED" size={18} /> },
      { label: "JWT Auth", icon: <TbShieldLock color="#A855F7" size={15} /> },
    ],
    features: [
      "AI-powered ATS score checker, job description tailoring & professional summary studio",
      "10+ curated professional templates (Tech ATS, Executive Serif, Modern Split, Classic)",
      "Pixel-perfect server-side PDF compilation with embedded typography and zero layout shifting",
      "Stateless JWT authentication, BCrypt hashing, automated rate limiting, and HTTP security headers",
      "Multi-stage Docker containerization and cloud-ready storage provider orchestration",
    ],
    learnings:
      "Architected enterprise-grade Java 21 / Spring Boot 3.4 REST APIs with Spring Data JPA & Flyway migrations, high-concurrency rate limiting, and seamless React 19 / TypeScript / Vite client integration.",
    github: "https://github.com/sidharthakuna/ResumeForge",
    demo: "https://resume-forge-fawn.vercel.app",
  },
  {
    id: "ai-noise-remover",
    title: "AI Audio Noise Remover",
    tagline: "High-throughput audio processing web engine for AI-powered noise reduction.",
    description:
      "A distributed web application that uses deep learning audio separation algorithms to clean noisy audio recordings. Features a Spring Boot REST API orchestrating Python AI processing scripts, secure file handling, asynchronous job processing, and containerized deployment.",
    image: aiNoiseRemoverImg,
    featured: true,
    tech: [
      { label: "Java", icon: <DiJava color="#E76F00" size={16} /> },
      { label: "Spring Boot", icon: <SiSpringboot color="#6DB33F" size={14} /> },
      { label: "Python", icon: <SiPython color="#38BDF8" size={14} /> },
      { label: "MySQL", icon: <DiMysql color="#00758F" size={18} /> },
      { label: "Docker", icon: <DiDocker color="#2496ED" size={18} /> },
      { label: "REST APIs", icon: <TbApi color="#38BDF8" size={16} /> },
      { label: "HTML5", icon: <DiHtml5 color="#E34F26" size={16} /> },
      { label: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={14} /> },
    ],
    features: [
      "High-efficiency audio upload & validation pipeline",
      "AI spectral subtraction & noise reduction processing",
      "RESTful API endpoints with multipart file streaming",
      "Clean audio download with optimized storage management",
      "Dockerized container containerization for scalable deployment",
    ],
    learnings:
      "Engineered full-stack Java Spring Boot architecture, cross-language process orchestration with Python AI models, relational database indexing in MySQL, multipart file buffer optimization, and containerization with Docker.",
    github: "https://github.com/sidharthakuna/Ai-BackgroundNoice-Remover",
    demo: "https://ai-backgroundnoice-remover.onrender.com",
  },
];
