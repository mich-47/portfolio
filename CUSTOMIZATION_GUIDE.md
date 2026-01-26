# Portfolio Customization Guide

## Overview

Your portfolio has been successfully cleaned and populated with your data. This guide explains how the site works and how to maintain it.

---

## 📋 What Was Changed

### 1. **Data Injection** ✅
All placeholder content has been replaced with your actual information:
- **Profile**: Michael Urquhart, Junior Systems Engineer
- **Metrics**: 220 Credits, 3 Industry Deployments, 100% SLA Uptime
- **Projects**: Micromouse MK.1, Enterprise Ops, PID Control Simulator
- **Skills**: Embedded Systems, Hardware & Tools, Software & Languages

### 2. **Lovable Cleanup** ✅
Removed all Lovable-specific tracking and dependencies:
- Removed `lovable-tagger` package dependency
- Removed `componentTagger` from Vite config
- Updated `index.html` metadata (removed Lovable CDN images)
- Updated `README.md` (removed all Lovable references)

### 3. **Educational Comments** ✅
Added detailed comments throughout the codebase to help you understand:
- How animations work (Framer Motion)
- How data flows from `portfolioData.ts` to components
- How responsive design is structured (Tailwind grid system)
- How scroll triggers and view-based animations function

---

## 🎯 Key Files to Know

### **Data Source** (Update this first!)
📄 [src/data/portfolioData.ts](src/data/portfolioData.ts)
- **Purpose**: Central hub for all content
- **What's in it**: Profile, projects, skills, navigation items
- **When to edit**: Any time you want to update site content
- **No need to touch components** - they pull data from here automatically

### **Main Sections**
These components build the page structure:

1. **[src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx)**
   - Full-screen intro with typing effect
   - Features: Character-by-character animation, blinking cursor
   - Uses: `profileData.name`, `profileData.tagline`

2. **[src/components/sections/AboutSection.tsx](src/components/sections/AboutSection.tsx)**
   - Bio card + metrics grid
   - Features: Glass morphism cards, staggered animations
   - Uses: `profileData` (name, title, bio), `profileData.metrics` array

3. **[src/pages/Index.tsx](src/pages/Index.tsx)**
   - Main layout orchestrator
   - Imports all sections and coordinates the page flow

### **UI Components**
Located in `src/components/ui/` - Pre-built components you can reuse:
- `GlassCard.tsx` - The frosted glass effect cards
- `MagneticButton.tsx` - Buttons with hover physics effect
- shadcn-ui components - Standard UI elements

---

## 🔧 How It Works (The Architecture)

```
┌─────────────────────────────────────────────────────────┐
│                   portfolioData.ts                      │
│         (Single source of truth for all content)       │
└────────────┬────────────────────────────────────────────┘
             │
             ├─→ HeroSection (reads profileData.name, .tagline)
             ├─→ AboutSection (reads profileData.metrics)
             ├─→ ProjectsSection (reads projectsData array)
             ├─→ SkillsSection (reads skillsData array)
             └─→ ContactSection (reads profileData.email)
```

**Key Concept**: Don't edit component files to change content. Edit `portfolioData.ts` and the components will automatically display your changes.

---

## 📝 Common Tasks

### Add a New Project
1. Open `src/data/portfolioData.ts`
2. Add a new object to the `projectsData` array:
```typescript
{
  id: 4,
  title: "Your Project Name",
  description: "What it does",
  image: "/placeholder.svg",
  tech: ["Tech1", "Tech2"],
  link: "#",
  github: "#",
  featured: true,  // Set to true to show in featured section
}
```

### Update Your Profile
1. Open `src/data/portfolioData.ts`
2. Edit the `profileData` object:
```typescript
export const profileData = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline - this animates in the hero",
  bio: "Your bio text",
  location: "Your location",
  // ... etc
}
```

### Add/Remove Skills
1. Open `src/data/portfolioData.ts`
2. Edit the `skillsData` array - add/remove from categories or create new categories:
```typescript
{
  category: "New Category",
  skills: [
    { name: "Skill Name", level: 90 }, // level = percentage (0-100)
  ]
}
```

### Change Styling
- **Colors**: Edit `src/index.css` (CSS variables like `--primary`, `--secondary`)
- **Spacing**: Edit Tailwind config in `tailwind.config.ts`
- **Component styles**: Edit className attributes in component files

---

## 🎨 Design System

### Colors
Primary color gradient appears on:
- Hero title ("Orbital" text)
- Button hover states
- Section headers
- Accent highlights

Edit in `src/index.css`:
```css
:root {
  --primary: ... /* Main color - currently cyan/teal */
}
```

### Animations
All animations use **Framer Motion** - look for `<motion.` elements:
- `initial` = starting state
- `animate` = final state
- `whileInView` = triggers when scrolled into view
- `transition` = duration, delay, easing

### Responsive Breakpoints
Using Tailwind CSS:
- `sm:` = 640px
- `md:` = 768px
- `lg:` = 1024px
- `xl:` = 1280px

Example: `className="text-sm md:text-lg lg:text-2xl"` = responsive text sizing

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
Creates optimized files in the `dist/` folder.

### Deploy Options
1. **Vercel** (recommended): Connect your GitHub repo
2. **Netlify**: Drag & drop the `dist/` folder
3. **GitHub Pages**: Push to gh-pages branch
4. **Custom Server**: Upload `dist/` folder contents

---

## 📚 Learning Path

If you want to understand the codebase deeper:

1. **Start with**: `src/data/portfolioData.ts` - See how data is structured
2. **Then read**: `src/pages/Index.tsx` - How components are orchestrated
3. **Look at**: `src/components/sections/HeroSection.tsx` - How animations work
4. **Check**: `src/components/sections/AboutSection.tsx` - How data maps to UI
5. **Explore**: `src/components/ui/` - Reusable component patterns

Each file has detailed comments explaining what's happening and why.

---

## 🛠️ Tech Stack

- **Vite** - Blazingly fast build tool
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics (orbital background)
- **shadcn-ui** - Component library
- **React Router** - Client-side routing

---

## ❓ FAQ

**Q: Can I change the visual design?**
A: Yes! Edit Tailwind classes in components and CSS variables in `src/index.css`.

**Q: How do I add new sections?**
A: Create a new file in `src/components/sections/`, import it in `Index.tsx`, add to navigation in `portfolioData.ts`.

**Q: Can this integrate with a CMS?**
A: Yes! The data structure is CMS-ready. Replace the `portfolioData.ts` imports with API calls.

**Q: How do I remove the orbital background?**
A: Edit `src/pages/Index.tsx` and comment out `<OrbitalBackground />`.

**Q: Can I add a blog?**
A: Yes! Create `src/components/sections/BlogSection.tsx` and integrate with a CMS or Markdown parser.

---

## 📞 Support

If you get stuck:
1. Check the comments in the relevant file
2. Look at similar components for patterns
3. Check Tailwind docs: https://tailwindcss.com
4. Check Framer Motion docs: https://www.framer.com/motion/
5. Check React docs: https://react.dev

---

**Your portfolio is now fully personalized and ready to maintain! 🚀**
