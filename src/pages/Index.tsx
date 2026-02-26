import { lazy, Suspense } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { SatelliteTracker } from "@/components/SatelliteTracker";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";

// Lazy load sections below the fold
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(module => ({ default: module.AboutSection })));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const SkillsSection = lazy(() => import("@/components/sections/SkillsSection").then(module => ({ default: module.SkillsSection })));
const CassianEmbed = lazy(() => import("@/components/sections/CassianEmbed").then(module => ({ default: module.CassianEmbed })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

const Index = () => {
  // Initialize Lenis smooth scrolling - creates the buttery-smooth scroll experience
  useSmoothScroll();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Three.js Orbital Background - 3D animated globe/orbital effect with WebGL */}
      <SatelliteTracker />

      {/* Fixed Navigation - Sticky header with section links and branding */}
      <Navigation />

      {/* Main Content - All portfolio sections stacked vertically */}
      <main>
        {/* Hero Section - Full-screen intro with typing effect and CTA buttons */}
        <HeroSection />

        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary font-mono tracking-widest">LOADING MODULES...</div>}>
          {/* About Section - Bio, metrics cards (220 Credits, 3 Deployments, 100% SLA) */}
          <AboutSection />

          {/* Projects Section - Grid layout showcasing Micromouse, Enterprise Ops, etc. */}
          <ProjectsSection />

          {/* Skills Section - Categorized skills (Embedded Systems, Hardware, Software) with progress bars */}
          <SkillsSection />

          {/* C.A.S.S.I.A.N. Live Demo Overlay */}
          <CassianEmbed />

          {/* Contact Section - Form or CTA for reaching out */}
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer - Additional links, copyright, etc. */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
