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
    githubUsername: "mich-47", // Your GitHub username for API integration
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
    image: "", // Replaced with code snippet
    codeSnippet: {
      language: "python",
      filename: "pid_controller.py",
      code: `def compute_pid(self, error, dt):
    # Proportional
    self.p_term = self.kp * error
    
    # Integral (with anti-windup)
    self.i_term += self.ki * error * dt
    self.i_term = clamp(self.i_term, -self.max_i, self.max_i)
    
    # Derivative
    d_err = (error - self.prev_error) / dt
    self.d_term = self.kd * d_err
    
    self.prev_error = error
    return self.p_term + self.i_term + self.d_term`
    },
    tech: ["Python", "MicroPython", "I2C", "PID Control", "Raspberry Pi Pico"],
    link: "#",
    github: "#",
    featured: true, // Featured projects appear first in Projects section
  },
  {
    id: 2,
    title: "Enterprise Ops Rollout",
    description: "Mass hardware deployment for Charles River Associates. Managed 50+ units with zero support downtime using ITIL v4 methodology.",
    image: "", // Replaced with terminal snippet
    codeSnippet: {
      language: "terminal",
      filename: "deployment_logs.sh",
      code: `$ ./provision --batch=EU-WEST-4
[INFO] Initializing AD binding protocol...
[OK] Connect to enterprise domain Controller-01
[INFO] Applying ITIL v4 baseline security policies
[OK] Disk encryption verified: AES-256-XTS
[INFO] Deploying agent packages...
  -> crowdstrike_falcon... [OK]
  -> zscaler_client...     [OK]
[SUCCESS] 50/50 endpoints provisioned successfully.
[INFO] Zero SLA breaches detected.`
    },
    tech: ["Logistics", "ITIL v4", "Batch Processing", "Hardware Deployment"],
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "PID System Simulator",
    description: "Educational simulator for tuning PID parameters in real-time. Demonstrates core embedded logic principles used in industrial applications.",
    image: "",
    codeSnippet: {
      language: "python",
      filename: "simulation_engine.py",
      code: `async def run_simulation(plant, controller, hz=100):
    dt = 1.0 / hz
    t = 0.0
    
    while t < MAX_SIM_TIME:
        # Sample physical plant state
        process_variable = await plant.read_sensor()
        
        # Calculate control effort
        error = setpoint - process_variable
        effort = controller.compute(error, dt)
        
        # Apply effort to actuators
        await plant.apply_actuator(effort)
        
        log_telemetry(t, process_variable, effort)
        t += dt`
    },
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
