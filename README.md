# Michael Urquhart's Portfolio

A modern, animated portfolio website showcasing embedded systems projects and engineering expertise.

## Project Structure

This is a React + TypeScript portfolio built with Vite, featuring:
- **Three.js Orbital Background**: Interactive 3D animated background
- **Smooth Scrolling**: Lenis-powered scroll experience  
- **Glass Morphism UI**: Custom glass card components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Framer Motion Animations**: Smooth entrance and scroll-triggered animations

## Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start development server
npm run dev
```

## File Structure Overview

```
src/
├── data/
│   └── portfolioData.ts          # All profile, project, and skill data
├── components/
│   ├── sections/                 # Page sections (Hero, About, Projects, etc.)
│   ├── ui/                       # Reusable UI components
│   ├── OrbitalBackground.tsx     # 3D Three.js animation
│   ├── Navigation.tsx            # Header navigation
│   └── Footer.tsx                # Footer section
├── hooks/
│   └── useSmoothScroll.ts        # Lenis smooth scroll hook
└── pages/
    └── Index.tsx                 # Main page layout
```

## Key Technologies

- **Vite**: Lightning-fast build tool
- **TypeScript**: Type-safe development
- **React**: UI framework
- **Tailwind CSS**: Utility-first styling
- **shadcn-ui**: High-quality component library
- **Framer Motion**: Animation library
- **Three.js**: 3D graphics
- **React Router**: Client-side routing

## Customization

### Update Your Profile Data

Edit [src/data/portfolioData.ts](src/data/portfolioData.ts) to customize:
- Profile information (name, title, bio)
- Project details
- Skills and expertise
- Contact information

### Styling

- Global styles: [src/index.css](src/index.css)
- Component styles: Tailwind CSS classes throughout
- Animations: Framer Motion in component files

## Deployment

```sh
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Deploy the `dist/` folder to your hosting platform (Vercel, Netlify, GitHub Pages, etc.).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest
- `npm run test:watch` - Watch mode for tests

## License

This project is your personal portfolio. Feel free to use it as a base for your own.
