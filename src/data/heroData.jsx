import { FaJava } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiDocker, SiPostgresql } from "react-icons/si";
import { TbApi } from "react-icons/tb";

export const HERO_STACK_DESKTOP = [
  { icon: <FaJava style={{ color: "#E76F00" }} />, label: "Java 21" },
  { icon: <SiSpringboot style={{ color: "#6DB33F" }} />, label: "Spring Boot" },
  { icon: <SiPostgresql style={{ color: "#4169E1" }} />, label: "PostgreSQL" },
  { icon: <TbApi style={{ color: "#38BDF8" }} />, label: "REST APIs" },
  { icon: <SiDocker style={{ color: "#2496ED" }} />, label: "Docker" },
  { icon: <SiMysql style={{ color: "#00758F" }} />, label: "MySQL" },
];

export const HERO_STACK_MOBILE = [
  { icon: <FaJava style={{ color: "#E76F00" }} />, label: "Java" },
  { icon: <SiSpringboot style={{ color: "#6DB33F" }} />, label: "Spring Boot" },
  { icon: <SiPostgresql style={{ color: "#4169E1" }} />, label: "PostgreSQL" },
  { icon: <TbApi style={{ color: "#38BDF8" }} />, label: "REST APIs" },
  { icon: <SiDocker style={{ color: "#2496ED" }} />, label: "Docker" },
];

export const HERO_PROFILE_INFO = {
  name: "Sidhartha Kuna",
  role: "Java Backend Developer",
  college: "Raghu Engineering College",
  github: "https://github.com/sidharthakuna",
  linkedin: "https://www.linkedin.com/in/sidharthakuna/",
  leetcode: "https://leetcode.com/u/SidharthaKuna/",
  email: "sidharthakuna@gmail.com",
};
