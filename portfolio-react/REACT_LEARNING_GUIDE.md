# React Portfolio - Learning Guide

## What You Now Have

A modern React portfolio with:
- ✅ Light/Dark mode toggle (Corporate ↔ Builder modes)
- ✅ Responsive design with Tailwind CSS
- ✅ Lucide React icons
- ✅ Smooth scroll animations
- ✅ Progress bar tracking
- ✅ Mobile-responsive navigation
- ✅ Bento grid skills layout
- ✅ Project cards with hover effects

## How It Works

### 1. **State Management with React Hooks**

```javascript
const [isDarkMode, setIsDarkMode] = useState(false);
const [scrollProgress, setScrollProgress] = useState(0);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

**What this does:**
- `useState` creates state variables
- Changing these triggers re-renders
- Components "remember" their state between renders

**Your task:** Add a new state variable to track the current section:
```javascript
const [currentSection, setCurrentSection] = useState('home');
```

---

### 2. **Side Effects with useEffect**

```javascript
useEffect(() => {
  const handleScroll = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    setScrollProgress(scrolled);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll); // Cleanup!
}, []); // Empty dependency array = runs once on mount
```

**What this does:**
- Runs code when the component mounts
- The cleanup function removes the listener (prevents memory leaks)
- The dependency array controls when it re-runs

**Why it's important:**
- Event listeners need to be cleaned up
- useEffect prevents bugs that occur with direct DOM manipulation

---

### 3. **Dark Mode Implementation**

```javascript
// Toggle state
onClick={() => setIsDarkMode(!isDarkMode)}

// Apply to document root
useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDarkMode]);
```

**How Tailwind dark mode works:**
- Tailwind looks for a `dark` class on the `html` element
- All Tailwind `dark:` classes become active when this class exists
- Example: `bg-white dark:bg-slate-950` → white in light mode, slate in dark mode

---

### 4. **Conditional Rendering**

```javascript
{isDarkMode && (
  <>
    <div className="absolute top-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-float" />
  </>
)}
```

**What this does:**
- `&&` operator: if `isDarkMode` is true, render the JSX; otherwise, render nothing
- Only shows floating animated blobs in dark mode (the "builder" vibe)

---

### 5. **Mapping Over Arrays**

```javascript
{[
  { title: '...', description: '...', tags: [...], icon: Zap },
  { title: '...', description: '...', tags: [...], icon: Cpu },
].map((project, idx) => (
  <div key={idx} className="...">
    {/* Project card JSX */}
  </div>
))}
```

**What this does:**
- `.map()` transforms an array into React components
- `key` prop helps React identify which items have changed
- `idx` is the index (0, 1, 2...)

**Your task:** Extract the projects array to a constant at the top:
```javascript
const PROJECTS = [
  { title: '...', ... },
  { title: '...', ... },
];
```

Then use it:
```javascript
{PROJECTS.map((project, idx) => ...)}
```

---

### 6. **Tailwind CSS Classes Explained**

```jsx
<div className="px-4 sm:px-6 lg:px-8 py-20">
```

**Breakdown:**
- `px-4` = padding horizontal on mobile (1rem)
- `sm:px-6` = padding horizontal on small screens and up (1.5rem)
- `lg:px-8` = padding horizontal on large screens and up (2rem)
- `py-20` = padding vertical 5rem

**Mobile-first approach:**
- Start with mobile styles
- Add `sm:`, `md:`, `lg:`, `xl:` prefixes for larger screens

**Common utility classes:**
- `bg-white` = background color white
- `text-gray-900` = text color dark gray
- `rounded-lg` = border radius
- `shadow-lg` = box shadow
- `hover:shadow-2xl` = shadow on hover
- `transition-all` = smooth animation between states
- `dark:bg-slate-950` = background when dark mode active

---

## Learning Assignments

### Easy (30 mins)
1. **Change a color**: Find `from-blue-600` in the hero section. Change it to `from-purple-600`. What other colors need to change to match?
2. **Add a new project**: Add a 5th project to the projects section. Make sure all the tags and description are filled in.
3. **Toggle dark mode**: Reload the page, click the theme toggle. Watch the entire site change colors. Inspect the `<html>` element with DevTools—see the `dark` class appear/disappear.

### Medium (1 hour)
1. **Create a skills data array**: Extract the skill categories into a constant `SKILLS` array. Use `.map()` to render them (like we do for projects).
2. **Add a scroll-to-top button**: Create a button that appears when the user scrolls > 300px. Clicking it scrolls back to the top. (Hint: Use `window.scrollTo({ top: 0, behavior: 'smooth' })`)
3. **Change the progress bar color**: The progress bar at the top uses `from-blue-500 to-cyan-500`. Change it to match your favorite color scheme.

### Hard (2+ hours)
1. **Build a contact form**: Replace the email link with a functional form. On submit, log the form data to the console. (Hint: Use `useState` to manage form inputs, `preventDefault()` on submit)
2. **Add project filtering**: Add buttons like we did in the vanilla portfolio: "All", "Hardware", "Software". Show/hide projects based on filter. (Hint: Add a `category` field to project data, use `useState` to track active filter)
3. **Implement smooth section scrolling**: When clicking nav links, highlight the nav link for the current section. (Hint: Use `useEffect` to detect which section is in view with Intersection Observer)

---

## Key Concepts You're Learning

| Concept | Why It Matters |
|---------|----------------|
| **useState** | Manage component data (state) |
| **useEffect** | Run side effects (API calls, event listeners) |
| **Conditional Rendering** | Show/hide UI based on state |
| **.map()** | Render lists of components |
| **Tailwind Dark Mode** | Build dual-mode UIs with one class |
| **Event Handlers** | Respond to user interactions (clicks, scrolls) |
| **Dependency Arrays** | Control when effects run |
| **Cleanup Functions** | Prevent memory leaks |

---

## Project Structure

```
portfolio-react/
├── src/
│   ├── App.jsx          ← Main component (YOU ARE HERE)
│   ├── index.css        ← Tailwind + fonts
│   ├── main.jsx         ← Entry point
│   └── assets/          ← Images
├── tailwind.config.js   ← Tailwind settings
├── postcss.config.js    ← CSS processing
└── package.json         ← Dependencies
```

---

## Next Steps

1. **Run the dev server** (already running at `http://localhost:5173`)
2. **Make a small change** to App.jsx and watch the page update (Hot Module Reloading!)
3. **Try the assignments** above
4. **Read the component comments** to understand each section
5. **Break things intentionally** and debug using DevTools

---

## Debugging Tips

**Console Logs:**
```javascript
useEffect(() => {
  console.log('isDarkMode changed:', isDarkMode);
}, [isDarkMode]);
```

**DevTools:**
- F12 to open
- Elements tab to inspect HTML/CSS
- Console tab to see logs and errors
- React DevTools extension (Chrome) to inspect state

**Hot Reload:**
- Edit `App.jsx`
- Save
- Page updates automatically (usually)

---

## Comparison: Vanilla vs React

| Feature | Vanilla | React |
|---------|---------|-------|
| **State** | Manual DOM updates | Automatic re-renders |
| **Events** | `addEventListener` | `onClick`, `onChange` |
| **Conditional** | `if` + `style.display` | `{condition && jsx}` |
| **Lists** | Loop + DOM methods | `.map()` |
| **Performance** | Manual optimization | Virtual DOM |
| **Learning Curve** | Lower | Higher |
| **Scalability** | Harder at scale | Easier |

You now understand **both**. That's a superpower.

---

## Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide React Icons](https://lucide.dev)
- [Vite Documentation](https://vitejs.dev)

---

## Questions to Ask Yourself

1. Why do we need `key` in `.map()`?
2. What happens if you remove the cleanup function from `useEffect`?
3. How does `isDarkMode ? 'dark' : ''` work inside the className?
4. Why is the dependency array `[]` important for the scroll listener?
5. Can you add a new feature without modifying App.jsx (component composition)?

**Go build. Experiment. Break things. Learn.**
