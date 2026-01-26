import { motion } from "framer-motion";
import { profileData } from "@/data/portfolioData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 py-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          {/* Logo */}
          <div className="font-display text-lg font-bold uppercase tracking-wider">
            <span className="text-primary">Orbital</span>
            <span className="text-foreground">Command</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} {profileData.name}. All rights reserved.
          </p>

          {/* Built with */}
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Three.js</span>, and{" "}
            <span className="text-primary">☕</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
