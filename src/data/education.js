import { COLORS } from "../components/PixelatedComponents"
import TSU from "../assets/education_logos/TSU.png"
import CLDH from "../assets/education_logos/CLDH.png"

export const education = [
  {
    id: 0,
    title: "Tarlac State University",
    subtitle: "Bachelor of Science in Information Technology (2019–2023)",
    image: TSU,
    border: COLORS.teal,
    badges: ["CGPA 8.5/10", "Tech Clubs", "Systems / Web"],
    description:
      "Focused on Computer Science fundamentals, software engineering, and modern web technologies. Participated in coding competitions and tech events.",
    achievements: [
      "Dean's List for Academic Excellence",
      "Winner - College Hackathon 2022",
      "Lead Developer - Student Portal Project",
    ],
    duration: "4 years",
    location: "Pune, Maharashtra",
    gpa: "8.5/10",
  },
  {
    id: 1,
    title: "Central Luzon Doctors Hospital - Educational Institution (CLDH)",
    subtitle: "High School (2017–2019)",
    image: CLDH,
    border: COLORS.orange,
    badges: ["Science Stream", "Mathematics", "Leadership"],
    description:
      "Specialized in Science stream with focus on Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills.",
    achievements: [
      "Top 5% in State Board Examinations",
      "School Science Fair Winner",
      "Mathematics Olympiad Participant",
    ],
    duration: "2 years",
    location: "Nagpur, Maharashtra",
    gpa: "92%",
  },
]

export default education
