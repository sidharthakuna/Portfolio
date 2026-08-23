import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const CODING_PROFILES = [
  {
    id: "leetcode",
    name: "LeetCode",
    icon: <SiLeetcode size={28} />,
    badge: "Algorithmic Problem Solving",
    stats: [
      { label: "Problems Solved", value: "76+" },
      { label: "Contest Rating", value: "1,298" },
    ],
    link: "https://leetcode.com/u/SidharthaKuna/",
    cta: "View LeetCode Profile",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <FaGithub size={28} />,
    badge: "Open Source Repositories",
    stats: [
      { label: "Public Repos", value: "8" },
      { label: "Yearly Contributions", value: "58+" },
    ],
    link: "https://github.com/sidharthakuna",
    cta: "Explore GitHub",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <FaLinkedinIn size={26} />,
    badge: "Professional Network",
    stats: [
      { label: "Network", value: "Let's Connect" },
      { label: "Handle", value: "@sidharthakuna" },
    ],
    link: "https://www.linkedin.com/in/sidharthakuna/",
    cta: "Connect on LinkedIn",
  },
];
