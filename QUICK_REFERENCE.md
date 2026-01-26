# ⚡ QUICK REFERENCE CARD

## 🎯 The Golden Rule
**Edit `src/data/portfolioData.ts` to change EVERYTHING**

Components will automatically update. You almost never need to edit component files!

---

## 📋 Common Tasks

### Change Your Name
```typescript
// File: src/data/portfolioData.ts
export const profileData = {
  name: "Your New Name",  // ← HERE
  title: "Your Title",
  // ...
}
```
Updates in: Hero section, About section, everywhere else ✅

### Add a Project
```typescript
// File: src/data/portfolioData.ts
export const projectsData = [
  // ... existing projects
  {
    id: 4,
    title: "My New Project",
    description: "What it does",
    image: "/placeholder.svg",
    tech: ["Tech1", "Tech2", "Tech3"],
    link: "#",
    github: "#",
    featured: true,  // Show in featured section
  }
]
```

### Add a Skill
```typescript
// File: src/data/portfolioData.ts
{
  category: "Your Category",
  skills: [
    { name: "Skill Name", level: 90 },  // level = 0-100
    { name: "Another Skill", level: 85 },
  ]
}
```

### Update Metrics
```typescript
// File: src/data/portfolioData.ts
metrics: [
  { label: "Credits Earned", value: "220" },      // ← CHANGE VALUE
  { label: "Industry Deployments", value: "3" },  // ← CHANGE VALUE
  { label: "SLA Uptime", value: "100%" },         // ← CHANGE VALUE
]
```

### Change Your Bio
```typescript
// File: src/data/portfolioData.ts
bio: "Your new bio text here. Can be multiple sentences.",  // ← EDIT HERE
```

### Update Contact Info
```typescript
// File: src/data/portfolioData.ts
export const profileData = {
  name: "Michael Urquhart",
  title: "Your Title",
  email: "your.email@example.com",     // ← CHANGE
  location: "Your Location",            // ← CHANGE
  social: {
    github: "https://github.com/yourname",      // ← CHANGE
    linkedin: "https://linkedin.com/in/yourname", // ← CHANGE
    twitter: "https://twitter.com/yourhandle",   // ← CHANGE
  }
}
```

---

## 🚀 Development Commands

```bash
# Start dev server (localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Watch tests (re-run on changes)
npm run test:watch

# Check code quality
npm run lint
```

---

## 📁 Important Files

| File | Purpose | Edit When |
|------|---------|-----------|
| `src/data/portfolioData.ts` | All content | Updating profile, projects, skills |
| `src/pages/Index.tsx` | Page layout | Adding/removing sections |
| `src/components/sections/HeroSection.tsx` | Hero section | Customizing intro |
| `src/components/sections/AboutSection.tsx` | About section | Customizing bio area |
| `src/index.css` | Colors & fonts | Changing color scheme |
| `tailwind.config.ts` | Tailwind config | Advanced styling |

---

## 🎨 Quick Styling Tips

### Change Primary Color (Cyan → Your Color)
```css
/* File: src/index.css */
:root {
  --primary: /* your color here */;
  /* Look for --primary, --primary-foreground, etc. */
}
```

### Change Font Size
```tsx
// In any component's className:
className="text-sm"   // Small
className="text-base" // Normal
className="text-lg"   // Large
className="text-2xl"  // Extra large
className="text-4xl"  // Huge
```

### Add Spacing
```tsx
// Padding (p = padding, m = margin)
className="p-4"   // Padding all sides
className="px-4"  // Padding left & right
className="py-4"  // Padding top & bottom
className="pt-4"  // Padding top only

// Sizes: 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, etc.
```

### Make Things Responsive
```tsx
className="text-sm md:text-lg lg:text-2xl"
          ↓ default (mobile)
          ↓ medium screens (md:)
          ↓ large screens (lg:)
```

---

## 🔧 Troubleshooting

### Changes Not Showing?
1. Save the file
2. Check browser console for errors (F12)
3. Restart dev server (`npm run dev`)
4. Clear browser cache (Ctrl+Shift+Delete)

### Styling Not Applying?
1. Check spelling of Tailwind class names
2. Make sure class is in a `className` attribute
3. Verify the element isn't overridden by another style
4. Check `tailwind.config.ts` for custom config

### Animation Not Working?
1. Check `transition` object in Framer Motion
2. Verify `initial` and `animate` states are different
3. Look in browser DevTools for JavaScript errors
4. Check that `motion.` is used (not regular HTML tags)

---

## 📚 Learning Resources

### Official Docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- shadcn/ui: https://ui.shadcn.com

### Video Tutorials
- React Basics: [freeCodeCamp React Course](https://www.youtube.com/watch?v=SqcY0GlETPk)
- Tailwind CSS: [Tailwind CSS Tutorial](https://www.youtube.com/watch?v=UBOj6rqRUMw)
- Framer Motion: [Framer Official Tutorial](https://www.framer.com/motion/)

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Update all data in `portfolioData.ts`
- [ ] Test on mobile (responsive design)
- [ ] Check all links are correct
- [ ] Verify no console errors (F12)
- [ ] Run `npm run build` successfully
- [ ] Preview build locally: `npm run preview`

### Deploy To:
- **Vercel**: Connect GitHub repo (recommended)
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **Custom Domain**: Upload `dist/` contents via FTP

---

## 🆘 Need Help?

1. **Check the comments** in the relevant file
2. **Read DATA_FLOW_GUIDE.md** for architecture overview
3. **Read CUSTOMIZATION_GUIDE.md** for detailed instructions
4. **Check official documentation** for frameworks used
5. **Use browser DevTools** (F12) to inspect elements

---

## 💡 Pro Tips

✨ **Always test on mobile!** Your site needs to work on phones.

✨ **Keep `portfolioData.ts` clean.** This is your most important file.

✨ **Use the comments.** Every file has explanations.

✨ **Don't delete CSS classes** unless you understand them.

✨ **Git is your friend.** Make commits before big changes!

---

## 📞 Common Questions

**Q: Can I change the background?**
A: Yes! Edit OrbitalBackground component or hide it in Index.tsx

**Q: Can I add a blog?**
A: Yes! Create `src/components/sections/BlogSection.tsx`

**Q: Can I add a contact form?**
A: Yes! Look at ContactSection.tsx as reference

**Q: Can I add animations to buttons?**
A: Yes! Wrap in `<motion.div>` and use Framer Motion

**Q: Where do I deploy?**
A: Run `npm run build`, then upload `dist/` folder to hosting

---

**Happy coding! You've got this! 🚀**
