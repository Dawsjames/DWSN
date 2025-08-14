import { blue, green, orange, purple } from "../utils/colors"
import ITBS from "../assets/company_logos/ITBS.png"
import SSS from "../assets/company_logos/SSS.png"

export const experiences = [
  {
    id: 0,
    name: "Information Technology Business Solutions",
    title: "Frontend Developer",
    joined: "Jan 2025",
    end: "June 2025",
    bio: "Working on full-stack development using Vue, Quasar, Php and PostgresQL . Developed multiple web applications and APIs, worked with cloud services, and collaborated with cross-functional teams to deliver high-quality software solutions",
    logo: ITBS,
    technologies: ["Vue", "TypeScript", "PHP", "PostgresQL", "Quasar"],
    color: green,
    colorScheme: {
      background: "#2a3441",
      border: "#83c5be",
      text: "#ffe5d9",
      accent: "rgba(108, 207, 161, 0.9)",
      glow: "#83c5bf5b",
      titleText: "#ffe5d9",
      subtitleText: "#ff8c42",
      descriptionText: "#ffe5d9",
      techText: "#ff8c42",
      dateText: "#ffe5d9",
    },
  },
  {
    id: 1,
    name: "Social Security Systems",
    title: "Account Officer",
    joined: "Dec 2023",
    end: "Dec 2024",
    bio: "Involved in management of client accounts, ensuring compliance with regulations, and providing excellent customer service. Developed skills in data analysis, problem-solving, and effective communication.",
    logo: SSS,
    technologies: [],
    color: blue,
    colorScheme: {
      background: "#03045e",
      border: "#00b4d8",
      text: "#ffd8be",
      accent: "#00b4d8",
      glow: "#00b4d854",
      titleText: "#ffe5d9",
      subtitleText: "#ff8c42",
      descriptionText: "#ffe5d9",
      dateText: "#ffe5d9",
    },
  },
]
