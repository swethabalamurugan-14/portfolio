export const PERSONAL_INFO = {
  name: "Swetha Balamurugan",
  role: "Software Developer",
  status: "Available for Software Developer roles",
  bio: "I build full-stack applications with Python, Django, and React — from database design to responsive, role-based interfaces.",
  aboutMarkdown: `Versatile Software Developer skilled in Python, SQL, and modern web technologies, with experience building scalable applications and managing databases.

Proficient in both frontend and backend development, with strong problem-solving, debugging, and collaboration skills. Passionate about delivering efficient, maintainable software and continuously learning emerging technologies.`,
  location: "Trichy, IN",
  email: "swethabalamurugan7414@gmail.com",
  phone: "+91 97514 90738",
  github: "https://github.com/swethabalamurugan-14",
  linkedin: "https://linkedin.com/in/swethabalamurugan",
  resumePath: "/Swetha-Balamurugan-Resume.pdf",
};

export const STATS_CARDS = [
  { value: "03", label: "projects shipped", isWide: false },
  { value: "01", label: "degree", isWide: false },
  { value: "7.73", label: "CGPA / 10", isWide: false },
  { value: "01", label: "internship", isWide: false },
  { value: "Software Developer", label: "role", isWide: true, isSmallVal: true },
  { value: "Trichy, IN", label: "based in", isWide: true, isSmallVal: true },
];

export const TECH_STACK_CATEGORIES = [
  {
    category: "Languages",
    count: 2,
    technologies: ["Python", "JavaScript"],
  },
  {
    category: "Frontend",
    count: 3,
    technologies: ["React.js", "HTML5", "CSS"],
  },
  {
    category: "Backend",
    count: 1,
    technologies: ["Django"],
  },
  {
    category: "Database",
    count: 3,
    technologies: ["SQL", "MySQL", "MongoDB"],
  },
  {
    category: "Workflow",
    count: 3,
    technologies: ["Git", "GitHub", "VS Code"],
  },
];

export const TECH_DETAILS_MAP = {
  Python: {
    description: "Used for application logic, backend development, and data-driven workflows.",
    usageMeta: "2 projects",
    mappedProjects: ["pg-management-system", "student-management"],
  },
  JavaScript: {
    description: "Used for interactive frontend behavior and web interfaces.",
    usageMeta: "2 projects",
    mappedProjects: ["pg-management-system", "pixelmart"],
  },
  HTML5: {
    description: "Used to structure responsive web pages and interfaces.",
    usageMeta: "intern + projects",
    mappedProjects: ["pg-management-system", "pixelmart"],
  },
  CSS: {
    description: "Used for responsive layouts, component styling, and polished interfaces.",
    usageMeta: "intern + projects",
    mappedProjects: ["pg-management-system", "pixelmart"],
  },
  "React.js": {
    description: "Used for component-based interfaces and responsive frontend experiences.",
    usageMeta: "2 projects",
    mappedProjects: ["pg-management-system", "pixelmart"],
  },
  Django: {
    description: "Used for backend business logic, authentication, APIs, and role-based workflows.",
    usageMeta: "1 project",
    mappedProjects: ["pg-management-system"],
  },
  SQL: {
    description: "Used for relational data modeling and database operations.",
    usageMeta: "2 projects",
    mappedProjects: ["pg-management-system", "student-management"],
  },
  MySQL: {
    description: "Used for relational data in the PG and student management projects.",
    usageMeta: "2 projects",
    mappedProjects: ["pg-management-system", "student-management"],
  },
  MongoDB: {
    description: "Used as the document database for the PixelMart marketplace.",
    usageMeta: "1 project",
    mappedProjects: ["pixelmart"],
  },
  Git: {
    description: "Used for version control and managing project development.",
    usageMeta: "workflow",
    mappedProjects: ["pg-management-system", "pixelmart", "student-management"],
  },
  GitHub: {
    description: "Used to host repositories and share project work.",
    usageMeta: "workflow",
    mappedProjects: ["pg-management-system", "pixelmart", "student-management"],
  },
  "VS Code": {
    description: "Used as the development environment across frontend and backend work.",
    usageMeta: "workflow",
    mappedProjects: ["pg-management-system", "pixelmart", "student-management"],
  },
};

export const PROJECTS_DATA = [
  {
    id: "pg-management-system",
    slug: "pg-management-system",
    title: "PG Management System",
    status: "Self-initiated project",
    isFeatured: true,
    path: "~/projects/pg-management-system",
    tagline: "A full-stack PG Management System to manage rooms, tenants, and rent payments, with role-based dashboards for administrators and tenants.",
    techs: ["Python", "Django", "React.js", "MySQL", "SQL"],
    githubUrl: "https://github.com/swethabalamurugan-14/pg-management-system",
    type: "pg-mockup",
    caseStudy: {
      title: "PG Management System",
      problem: "PG and hostel owners were tracking rooms, tenants, and rent manually — no clear view of who owed what or which rooms were free at any given time.",
      role: "Solo, self-initiated — designed and built the full stack end to end, from the database schema to the deployed UI.",
      architecture: "Django backend handling business logic and auth, MySQL for relational tenant/room/payment data, and a React frontend consuming the API — with role-based dashboards splitting admin and tenant views so each side only sees what's relevant to them.",
      outcome: "Admins get a single view of rooms, tenants, and rent status instead of a spreadsheet. Tenants get their own dashboard to check dues — turning a manual, error-prone process into a real, role-aware application.",
      gitLog: [
        { hash: "a1c9e2f", message: "init: Django project + MySQL schema for rooms/tenants" },
        { hash: "3f7b1de", message: "feat: role-based auth for admin/tenant dashboards" },
        { hash: "9d4a082", message: "feat: rent payment tracking + status views" },
        { hash: "e28f5c1", message: "polish: responsive React UI pass" },
      ],
    },
  },
  {
    id: "pixelmart",
    slug: "pixelmart",
    title: "PixelMart — Digital Marketplace",
    status: "Completed",
    isFeatured: false,
    badge: "Final year project",
    path: "~/projects/pixelmart",
    tagline: "A digital marketplace for creators to upload and sell digital assets, with authentication, search, and filtering.",
    techs: ["React.js", "JavaScript", "MongoDB"],
    githubUrl: "https://github.com/swethabalamurugan-14/pixelmart",
    type: "market-mockup",
  },
  {
    id: "student-management",
    slug: "student-management",
    title: "Student Management System",
    status: "Completed",
    isFeatured: false,
    badge: "Mini project",
    path: "~/projects/student-management",
    tagline: "A desktop application to manage student records, with CRUD operations using Python and MySQL and a Tkinter interface.",
    techs: ["Python", "Tkinter", "MySQL"],
    githubUrl: "https://github.com/swethabalamurugan-14/student-management",
    type: "student-mockup",
  },
];

export const JOURNEY_BLOCKS = [
  {
    label: "01 / Experience",
    isFeatured: true,
    entries: [
      {
        date: "Jul 2025 — Sep 2025",
        title: "Web Development Intern",
        bullets: [
          "Developed responsive web pages using HTML, CSS, and JavaScript to enhance user experience.",
          "Implemented responsive design techniques for desktop, tablet, and mobile devices.",
          "Identified and resolved UI issues, improving functionality and usability.",
        ],
      },
    ],
  },
  {
    label: "02 / Education",
    isFeatured: false,
    entries: [
      {
        date: "Jun 2023 — May 2026",
        title: "B.Voc Software Development",
        desc: "Holy Cross College (Autonomous), Bharathidasan University · CGPA 7.73.",
      },
    ],
  },
  {
    label: "03 / Achievements",
    isFeatured: false,
    entries: [
      {
        date: "2026",
        title: "Research paper — IC-AIETS 2026",
        desc: 'Presented the research paper "AI Tools in Software Industry" at the International Conference on Next-Gen AI and Emerging Technologies for Sustainable Development (IC-AIETS 2026).',
      },
      {
        date: "2025",
        title: "SDG-Based Hackathon",
        desc: "Participated in the SDG-Based Hackathon conducted by St. Joseph’s College, Tiruchirappalli.",
      },
      {
        date: "Certifications",
        title: "Django, MongoDB & Typewriting",
        desc: "Advanced Python with Django — FITA Academy · MongoDB Certification — MongoDB University · Typewriting Certification — English Higher/Lower, First Class.",
      },
    ],
  },
];

export const PHILOSOPHY_DATA = {
  lead: "I build software around real problems, not feature checklists.",
  paragraphs: [
    "I care about how real users move through a system — permissions, data flow, edge cases, responsive layouts, and the small details that make software easier to use.",
    "My goal is simple: build efficient, maintainable software that solves a real problem and remains understandable as it grows.",
  ],
};
