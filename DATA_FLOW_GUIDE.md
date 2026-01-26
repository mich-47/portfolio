## PORTFOLIO DATA FLOW DIAGRAM

```
┌────────────────────────────────────────────────────────────────────┐
│                   portfolioData.ts                                 │
│         (THE SINGLE SOURCE OF TRUTH - EDIT HERE FIRST!)           │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  profileData = {                    projectsData = [              │
│    name: "Michael Urquhart"           { title: "Project 1", ... } │
│    title: "Junior Systems Eng..."     { title: "Project 2", ... } │
│    tagline: "Bridging..."             ...                         │
│    bio: "220 Credits..."            ]                             │
│    metrics: [                                                      │
│      { 220 Credits },               skillsData = [                │
│      { 3 Deployments },               { category: "...",          │
│      { 100% Uptime }                    skills: [...] }           │
│    ]                                 ]                             │
│  }                                                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
                    ↓ (imported by all sections)
     ┌──────────────┴──────────────┬─────────────────┬──────────────┐
     ↓                            ↓                  ↓              ↓
┌─────────────┐          ┌──────────────┐   ┌──────────────┐   ┌──────────┐
│HeroSection  │          │AboutSection  │   │ProjectsSeect│   │SkillsSec │
│             │          │              │   │             │   │          │
│Uses:        │          │Uses:         │   │Uses:        │   │Uses:     │
│- name       │          │- name        │   │- projects   │   │- skills  │
│- title      │          │- title       │   │  Data       │   │  Data    │
│- tagline    │          │- bio         │   │             │   │          │
│(typing fx)  │          │- metrics     │   │(grid cards) │   │(progress │
│             │          │ (stat cards) │   │             │   │  bars)   │
│             │          │              │   │             │   │          │
│RENDERS:     │          │RENDERS:      │   │RENDERS:     │   │RENDERS:  │
│ Full-screen │          │ Bio Card +   │   │ Project     │   │ Skills   │
│ Hero with   │          │ Metrics Grid │   │ Cards Grid  │   │ Categories
│ animations  │          │              │   │             │   │          │
└─────────────┘          └──────────────┘   └──────────────┘   └──────────┘
     ↓                            ↓                  ↓              ↓
     └────────────────────────────┴──────────────────┴──────────────┘
                        ↓
         ┌──────────────────────────────┐
         │   COMPLETE PAGE RENDERS      │
         │   (All sections together)    │
         │                              │
         │   User sees:                 │
         │   - Michael Urquhart info   │
         │   - 220 Credits, etc.       │
         │   - Project showcases       │
         │   - Skills with levels      │
         └──────────────────────────────┘
```

## DATA UPDATE FLOW

```
STEP 1: Edit portfolioData.ts
┌─────────────────────────────────────┐
│ Change profileData.name from        │
│ "Michael Urquhart" to "Your Name"   │
└─────────────────────────────────────┘
                ↓
STEP 2: Components Re-render Automatically
┌─────────────────────────────────────┐
│ HeroSection sees new name value     │
│ Updates: {profileData.name}         │
│ All components using name re-render │
└─────────────────────────────────────┘
                ↓
STEP 3: Browser Shows Changes Instantly
┌─────────────────────────────────────┐
│ "Your Name" appears everywhere      │
│ that uses profileData.name          │
│ No component files need editing!    │
└─────────────────────────────────────┘
```

## COMPONENT TREE

```
Index.tsx (Main Page)
├── OrbitalBackground          (3D animated globe)
├── Navigation                  (Header with links)
├── main (Content wrapper)
│   ├── HeroSection             (Full-screen intro)
│   │   ├── Profile Name & Title (from profileData)
│   │   ├── Typing Animation    (tagline)
│   │   ├── CTA Buttons
│   │   └── Scroll Indicator
│   │
│   ├── AboutSection            (Profile + metrics)
│   │   ├── GlassCard (Bio)     (uses profileData)
│   │   │   ├── Avatar
│   │   │   ├── Name & Title
│   │   │   └── Bio Text
│   │   └── Metric Cards        (from profileData.metrics)
│   │       ├── 220 Credits
│   │       ├── 3 Deployments
│   │       └── 100% Uptime
│   │
│   ├── ProjectsSection         (Project grid)
│   │   ├── ProjectCard 1       (from projectsData)
│   │   ├── ProjectCard 2
│   │   └── ProjectCard 3
│   │
│   ├── SkillsSection           (Skills + progress bars)
│   │   ├── Skill Category 1    (from skillsData)
│   │   │   ├── Skill 1 (level bar)
│   │   │   ├── Skill 2 (level bar)
│   │   │   └── ...
│   │   ├── Skill Category 2
│   │   └── Skill Category 3
│   │
│   └── ContactSection          (CTA + form)
│
└── Footer                       (Footer links)
```

## EDITING EXAMPLES

### Example 1: Change Name Everywhere
```typescript
// Edit ONE place:
src/data/portfolioData.ts
export const profileData = {
  name: "Michael Urquhart",  // ← CHANGE HERE
  // ... rest of data
}

// Automatically updates in:
✅ Hero: "Michael Urquhart · Junior Systems Engineer"
✅ About: Name in bio card
✅ Every place that uses {profileData.name}
```

### Example 2: Add a New Project
```typescript
// Edit this ONE array:
src/data/portfolioData.ts
export const projectsData = [
  { id: 1, title: "Micromouse..." },
  { id: 2, title: "Enterprise..." },
  { id: 3, title: "PID Control..." },
  // ADD NEW ONE HERE:
  { 
    id: 4,
    title: "My New Project",
    description: "...",
    tech: ["Tech1", "Tech2"],
    featured: true,
  }
]

// Automatically appears in:
✅ Projects section (grid)
✅ Responsive on mobile
✅ All styling applied automatically
```

### Example 3: Update Metrics
```typescript
// Edit metrics array:
src/data/portfolioData.ts
metrics: [
  { label: "Credits Earned", value: "220" },    // ← CHANGE VALUE
  { label: "Industry Deployments", value: "3" },
  { label: "SLA Uptime", value: "100%" },
]

// Automatically updates in:
✅ About section metrics cards
✅ Styling preserved
✅ Animations still work
```

## ANIMATION FLOW

```
User loads portfolio
        ↓
HeroSection mounts
        ↓
Framer Motion initialization
        ↓
┌─────────────────────────────────────┐
│ initial: { opacity: 0, y: 30 }      │  (Start state: invisible, 30px down)
│                                     │
│ animate: { opacity: 1, y: 0 }       │  (End state: visible, at normal position)
│                                     │
│ transition: { duration: 0.8 }       │  (Over 0.8 seconds)
└─────────────────────────────────────┘
        ↓
Entire hero fades + slides up over 0.8s
        ↓
User scrolls down
        ↓
AboutSection enters viewport
        ↓
whileInView triggers animation
        ↓
Cards fade + slide up with staggered delays
        ↓
User continues scrolling, more animations trigger
```

## TAILWIND GRID SYSTEM (Responsive Design)

```
DESKTOP (lg: 1024px+)
┌─────────────────────────────────────────┐
│         3 Column Layout                 │
│ ┌──────────────┐ ┌────────────────────┐ │
│ │ Bio Card     │ │  Metrics Cards     │ │
│ │ (2 cols)     │ │  (1 col, 3 cards)  │ │
│ │              │ │ ┌────────────────┐ │ │
│ │              │ │ │ 220 Credits    │ │ │
│ │              │ │ └────────────────┘ │ │
│ │              │ │ ┌────────────────┐ │ │
│ │              │ │ │ 3 Deployments  │ │ │
│ │              │ │ └────────────────┘ │ │
│ │              │ │ ┌────────────────┐ │ │
│ │              │ │ │ 100% Uptime    │ │ │
│ │              │ │ └────────────────┘ │ │
│ └──────────────┘ └────────────────────┘ │
└─────────────────────────────────────────┘

TABLET (md: 768px - 1023px)
┌──────────────────────────┐
│    Stacked vertically    │
│  ┌──────────────────────┐ │
│  │ Bio Card             │ │
│  │ (full width)         │ │
│  └──────────────────────┘ │
│  ┌──────────────────────┐ │
│  │ Metrics Cards Grid   │ │
│  │ (stacked)            │ │
│  └──────────────────────┘ │
└──────────────────────────┘

MOBILE (sm: 320px - 767px)
┌────────────┐
│ Single Col │
│ ┌────────┐ │
│ │ Bio    │ │
│ │ Card   │ │
│ └────────┘ │
│ ┌────────┐ │
│ │Metric 1│ │
│ └────────┘ │
│ ┌────────┐ │
│ │Metric 2│ │
│ └────────┘ │
│ ┌────────┐ │
│ │Metric 3│ │
│ └────────┘ │
└────────────┘

This is controlled by Tailwind classes:
className="grid gap-8 lg:grid-cols-3"
         ↓ ↓ ↓
    - Gap between items is 8 units
    - Only on large screens (lg:), make 3 columns
    - Default: 1 column (responsive!)
```

## KEY CONCEPTS

### 1. **Data-Driven Components**
✅ Component doesn't create data, it receives it
✅ If data changes, component automatically updates
✅ No hardcoding content in JSX

### 2. **Separation of Concerns**
✅ `portfolioData.ts` = data
✅ Components = presentation
✅ Easy to swap content or redesign

### 3. **Responsive Design**
✅ Tailwind breakpoints handle it
✅ Same component works on all screen sizes
✅ No if/else statements needed

### 4. **Animation Performance**
✅ Framer Motion handles smoothness
✅ Hardware-accelerated transforms
✅ Scroll triggers are lazy-loaded

### 5. **Maintainability**
✅ One file to edit for all content
✅ Components stay clean and focused
✅ Easy to add features without touching data

---

**REMEMBER: When in doubt, edit `portfolioData.ts` first!**
