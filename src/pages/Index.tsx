import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { SatelliteTracker } from "@/components/SatelliteTracker";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

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
        
        {/* About Section - Bio, metrics cards (220 Credits, 3 Deployments, 100% SLA) */}
        <AboutSection />
        
        {/* Projects Section - Grid layout showcasing Micromouse, Enterprise Ops, etc. */}
        <ProjectsSection />
        
        {/* Skills Section - Categorized skills (Embedded Systems, Hardware, Software) with progress bars */}
        <SkillsSection />
        
        {/* Contact Section - Form or CTA for reaching out */}
        <ContactSection />
      </main>

      {/* Footer - Additional links, copyright, etc. */}
      <Footer />
    </div>
  );
};

export default Index;
