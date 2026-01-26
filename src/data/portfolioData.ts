// =============================================================================
// PORTFOLIO DATA - Single source of truth for all content
// =============================================================================
// This file contains all the data displayed on your portfolio.
// Edit these values to update your site without touching the components.
// The structure is designed to be CMS-ready for future expansion.
// =============================================================================

export const profileData = {
  // Main profile section - shown in Hero and About sections
  name: "Michael Urquhart",
  title: "Junior Systems Engineer (Level 4 / CertHE)",
  tagline: "Bridging the gap between theoretical physics and heavy industrial application.",
  bio: "220 Credits earned (Year 1 & 2 Coursework). Specializing in Embedded Logic and PID Control. Passionate about autonomous systems and industrial applications.",
  location: "UK",
  email: "michael@example.com",
  availability: "Open to opportunities",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  // Metrics display in About section - Key stats about your experience
  metrics: [
    { label: "Credits Earned", value: "220" }, // CertHE coursework
    { label: "Industry Deployments", value: "3" }, // Enterprise Ops rollout + others
    { label: "SLA Uptime", value: "100%" }, // Zero support downtime
  ],
};

export const projectsData = [
  {
    id: 1,
    title: "Micromouse MK.1",
    description: "Autonomous maze-solving robot on Raspberry Pi Pico. Implements advanced PID control algorithms for sensor feedback and navigation.",
    image: "/placeholder.svg",
    tech: ["Python", "MicroPython", "I2C", "PID Control", "Raspberry Pi Pico"],
    link: "#",
    github: "#",
    featured: true, // Featured projects appear first in Projects section
  },
  {
    id: 2,
    title: "Enterprise Ops Hardware Rollout",
    description: "Mass hardware deployment for Charles River Associates. Managed 50+ units with zero support downtime using ITIL v4 methodology.",
    image: "/placeholder.svg",
    tech: ["Logistics", "ITIL v4", "Batch Processing", "Hardware Deployment"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "PID Control System Simulator",
    description: "Educational simulator for tuning PID parameters in real-time. Demonstrates core embedded logic principles used in industrial applications.",
    image: "/placeholder.svg",
    tech: ["Python", "Control Theory", "Visualization", "Real-time Feedback"],
    link: "#",
    github: "#",
    featured: true,
  },
];

// Skills grouped by category - Maps to Skills section with progress bars
export const skillsData = [
  {
    category: "Embedded Systems",
    skills: [
      { name: "PID Tuning", level: 95 }, // Level = proficiency percentage
      { name: "MicroPython", level: 90 },
      { name: "Embedded C++", level: 85 },
      { name: "I2C Protocol", level: 88 },
      { name: "Real-time Logic", level: 90 },
    ],
  },
  {
    category: "Hardware & Tools",
    skills: [
      { name: "Oscilloscopes", level: 85 },
      { name: "Soldering (PCB)", level: 90 },
      { name: "Fusion 360", level: 80 },
      { name: "Raspberry Pi Pico", level: 92 },
      { name: "Hardware Debugging", level: 88 },
    ],
  },
  {
    category: "Software & Languages",
    skills: [
      { name: "Python (Async)", level: 90 },
      { name: "Systems Architecture", level: 85 },
      { name: "Control Theory", level: 88 },
      { name: "ITIL v4", level: 80 },
      { name: "Batch Processing", level: 82 },
    ],
  },
];

// Navigation items - Links in header and smooth scroll targets
export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
