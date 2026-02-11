import type { Experience, NavItem, Project, GalleryItem, Education, BlogPost, SkillCategory } from "./types";

export const PROFILE = {
  name: "Lokesh Bhagadkar",
  role: "Full Stack Engineer",
  location: "Maharashtra, IN",
  email: "bhag.loki@gmail.com",
  about: `I am a passionate software engineer with a focus on building scalable web applications. 
  Like a well-maintained encyclopedia, I believe in structured, clean, and accessible code. 
  I enjoy turning complex problems into simple, beautiful, and intuitive designs.`,
  image: "/images/lokesh.jpg", // Placeholder
  whatsappNumber: "924479312" // Add real number without +
};

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "gallery", label: "Gallery" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "exp1",
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description: [
      "Led the migration of the core product to React 18, improving performance by 40%.",
      "Architected a reusable component library used across 5 different internal products.",
      "Mentored junior developers and conducted code reviews."
    ]
  },
  {
    id: "exp2",
    role: "Web Developer",
    company: "Creative Agency",
    period: "2019 - 2021",
    description: [
      "Developed responsive websites for over 20 clients using modern web technologies.",
      "Collaborated with designers to implement pixel-perfect UIs.",
      "Optimized SEO scores, resulting in a 25% increase in organic traffic for key clients."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu1",
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    period: "2015 - 2019",
    description: [
      "Graduated with First Class Honours.",
      "Specialized in Artificial Intelligence and Data Structures.",
      "President of the Coding Club."
    ]
  },
  {
    id: "edu2",
    institution: "City High School",
    degree: "High School Diploma (Science Stream)",
    period: "2013 - 2015",
    description: [
      "Major in Physics, Chemistry, and Mathematics.",
      "Won State Level Math Olympiad."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "EcoTrack Analytics",
    year: "2023",
    description: "A dashboard for tracking carbon footprint usage for small businesses. Visualizes data using D3.js and Recharts.",
    technologies: ["React", "TypeScript", "D3.js", "Node.js"],
    link: "#"
  },
  {
    id: "p2",
    title: "WikiClone",
    year: "2022",
    description: "A lightweight content management system inspired by Wikipedia's minimalist design philosophy.",
    technologies: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    link: "#"
  },
  {
    id: "p3",
    title: "TaskMaster AI",
    year: "2021",
    description: "A productivity app that uses AI to prioritize daily tasks based on deadlines and complexity.",
    technologies: ["Python", "FastAPI", "React Native"],
    link: "#"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Redux", "GraphQL"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "REST APIs"]
  },
  {
    category: "DevOps & Tools",
    items: ["Git & GitHub", "Docker", "AWS", "Vercel", "Linux"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    imageUrl: "/images/submission.jpg",
    caption: "Working on the new server architecture diagram."
  },
  {
    id: "g2",
    imageUrl: "/images/lokesh.jpg",
    caption: "Team offsite in the mountains (2023)."
  },
  {
    id: "g3",
    imageUrl: "/images/submission.jpg",
    caption: "Speaking at ReactConf regarding performance optimizations."
  },
  {
    id: "g4",
    imageUrl: "/images/lokesh.jpg",
    caption: "My minimalist home office setup."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "The Art of Minimalist Web Design",
    excerpt: "Why less is more when it comes to user experience and performance.",
    date: "March 15, 2024",
    lastUpdated: "March 20, 2024",
    readTime: "5 min read",
    tags: ["Design", "UX", "Minimalism"],
    content: [
      "In a world cluttered with information, minimalism in web design is not just an aesthetic choice; it's a necessity. By stripping away the non-essential, we allow the content to shine and the user to focus on what truly matters.",
      "Cognitive load is real. When users are bombarded with popups, animations, and complex layouts, their ability to process information diminishes. Minimalist design respects the user's attention span.",
      "However, minimalism isn't just about removing things. It's about ensuring that every element on the screen serves a distinct purpose. Whitespace becomes an active element, guiding the eye and creating rhythm.",
      "In this project, I attempted to emulate the structure of a wiki entry. Why? Because it's a format we all know instinctively. It implies authority, structure, and clarity. By adopting these conventions, we lower the learning curve for new visitors.",
      "Key principles I followed: high contrast text for readability, strict typographic hierarchy, and limited color palette used only for interaction and semantic meaning."
    ]
  },
  {
    id: "b2",
    title: "Scaling React Applications effectively",
    excerpt: "Best practices for managing state and side effects in large codebases.",
    date: "February 10, 2024",
    readTime: "8 min read",
    tags: ["React", "Engineering", "Performance"],
    content: [
      "As React applications grow, the initial simplicity of 'useState' and 'useEffect' can quickly turn into a tangle of spaghetti code. Scaling requires intention and architectural discipline.",
      "One of the first patterns to adopt is the separation of concerns. Keep your components presentational. Move your business logic into custom hooks. This not only makes your components cleaner but also makes your logic testable and reusable.",
      "State management is another bottleneck. Do you really need Redux? Or Context? Often, server state (TanStack Query) and local state are enough. Don't over-engineer your global state store before you actually have global state problems.",
      "Performance optimization shouldn't be premature, but it should be continuous. Use the React DevTools Profiler. Memoize expensive calculations, but don't wrap every function in useCallback. Understand referential equality."
    ]
  },
  {
    id: "b3",
    title: "Why I switched from VS Code to Neovim",
    excerpt: "A journey into keyboard-centric development and productivity.",
    date: "January 05, 2024",
    lastUpdated: "January 22, 2024",
    readTime: "6 min read",
    tags: ["Productivity", "Tools", "Vim"],
    content: [
      "I was a power user of VS Code. I had my extensions, my snippets, and my themes. But I felt a ceiling. The mouse was slowing me down.",
      "Switching to Neovim wasn't about being cool; it was about speed of thought. When you can edit text at the speed you think, the editor disappears.",
      "The learning curve is steep, yes. But the investment pays off compound interest over years. Modal editing changes how you perceive text—not as a stream of characters, but as objects (words, sentences, paragraphs) to be manipulated.",
      "My config is now written in Lua, tailored exactly to my workflow. I don't wait for features to be added; I add them myself."
    ]
  }
];