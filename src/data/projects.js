// R3 Project Images
import R3_preview from "../assets/projects/R3/R3_preview.png"
import R3_preview1 from "../assets/projects/R3/R3_preview(1).png"
import R3_preview2 from "../assets/projects/R3/R3_preview(2).png"

// R8 Project Images
import R8_preview from "../assets/projects/R8/R8_preview.png"
import R8_preview1 from "../assets/projects/R8/R8_preview(1).png"
import R8_preview2 from "../assets/projects/R8/R8_preview(2).png"
import R8_preview3 from "../assets/projects/R8/R8_preview(3).png"
import R8_preview4 from "../assets/projects/R8/R8_preview(4).png"

// n8n Project Images
import n8n_preview from "../assets/projects/n8n/n8n_preview.png"
import n8n_preview1 from "../assets/projects/n8n/n8n_preview(1).png?url"
import n8n_preview2 from "../assets/projects/n8n/n8n_preview(2).png?url"

// Scada Tasklist Images
import tasklist_preview from "../assets/projects/Scada Tasklist/tasklist_preview.png"
import tasklist_preview1 from "../assets/projects/Scada Tasklist/tasklist_preview(1).png"

import KC_workflow from "../assets/projects/KC_Workflow/KC_workflow.png"
import KC_workflow1 from "../assets/projects/KC_Workflow/KC_workflow1.png"

// Swagger Images
import swagger_preview from "../assets/projects/swagger/swagger_preview.png"

// SCADA Admin Images
import admin_image from "../assets/projects/SCADA_admin/admin.png"

import imagePlaceholder from "../assets/imagePlaceholder.png"

export const projects = [
  {
    name: "King Caller Workflow Module",
    description:
      "A comprehensive automation workflow module designed for the King Caller SaaS platform to streamline and automate agent call operations. Features intelligent call routing, automated task management, real-time monitoring, and integration with external systems for efficient call center operations.",
    tags: ["React", "Tailwind", "Express", "Postgresql", "Redux", "Supabase"],
    thumbnail: KC_workflow,
    images: [KC_workflow, KC_workflow1],
    source_code_link: null,
    live_demo_link: null,
    isPrivate: true,
  },
  {
    name: "DICT Region III Landing Page",
    description:
      "Official DICT portal for Region 3’s Disaster Risk Reduction and Management, providing tools and resources for emergency response, community preparedness, communication, and resilience.",
    tags: ["Vue", "Quasar", "PostgreSQL", "PHP", "PHPMaker", "Axios"],
    thumbnail: R3_preview,
    images: [R3_preview, R3_preview1, R3_preview2],
    source_code_link: "",
    live_demo_link: "https://dictr3safe.ph/#/",
    isPrivate: true,
  },
  {
    name: "DICT Region VIII Landing Page",
    description:
      "A portal by the Department of Information and Communications Technology for Disaster Risk Reduction and Management in Region 8, offering tools for disaster response, preparedness, mental‑health support, planning, and communication.",
    tags: ["Vue", "Quasar", "PostgreSQL", "PHP", "PHPMaker", "Axios"],
    thumbnail: R8_preview,
    images: [R8_preview, R8_preview1, R8_preview2, R8_preview3, R8_preview4],
    source_code_link: "",
    live_demo_link: "https://dictdrrm8.ph",
    isPrivate: true,
  },
  {
    name: "Automated Video Cutting Workflow",
    description:
      "A custom-built automation workflow that processes uploaded videos, extracts and analyzes data, applies AI-based transformations, and outputs results through multiple parallel processing branches and then gives you the final results automatically.",
    tags: ["Docker", "n8n", "JavaScript", "Ollama", "FFmpeg"],
    thumbnail: n8n_preview,
    images: [n8n_preview, n8n_preview1, n8n_preview2],
    source_code_link: null,
    live_demo_link: "",
    isPrivate: false,
  },
  {
    name: "SCADA Team Tasklist",
    description:
      "A simple, visual team dashboard where you can add team members and track project tasks across statuses (e.g., To Do, In Progress, Deployed). It shows counts of completed, high‑priority, overdue, and unassigned tasks—all in one place.",
    tags: ["Firebase", "JavaScript", "Axios"],
    thumbnail: tasklist_preview,
    images: [tasklist_preview, tasklist_preview1],
    source_code_link: "https://github.com/Dawsjames/scada-team-tasklist",
    live_demo_link: "https://scadateamtasklist.netlify.app",
    isPrivate: false,
  },
  {
    name: "SCADA Admin - DICT Region III/VIII",
    description:
      "Internal management system for SCADA operations with advanced monitoring capabilities. Features real-time data visualization, alert management, and comprehensive reporting tools.",
    tags: ["Vue", "TypeScript", "Quasar", "ArangoDB", "WebSocket"],
    thumbnail: admin_image,
    images: [admin_image],
    source_code_link: null,
    live_demo_link: null,
    isPrivate: true,
  },
  {
    name: "Swagger UI",
    description:
      "An interactive API testing page for a Weather REST API. It lets you try out weather queries in JSON format (e.g., by entering a location like San Fernando, PH), no API key needed.",
    tags: ["Swagger", "OpenAPI", "REST API", "JSON", "JavaScript"],
    thumbnail: swagger_preview,
    images: [swagger_preview],
    source_code_link: "https://github.com/Dawsjames/swagger-ui", // Private/confidential
    live_demo_link: "https://swagger-ui-endpoints.netlify.app", // Internal system
    isPrivate: false,
  },
  {
    name: "IncoSuf Electronic Voting System - Student Project",
    description:
      "An electronic voting app using blockchain technology, developed as an IT degree capstone. It leverages Python (backend) and HTML/CSS (frontend) to create a tamper-resistant voting workflow.",
    tags: ["SQLite", "Python", "Flask"],
    thumbnail: imagePlaceholder,
    images: [imagePlaceholder],
    source_code_link:
      "https://github.com/Dawsjames/IncoSuf-Electronic-Voting-System",
    live_demo_link: "",
    isPrivate: false,
  },
]
