import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { profileData } from "@/data/portfolioData";

export function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="section-container">
        {/* Section header - animates in when scrolled into view (whileInView) */}
        {/* Triggers animation 100px before section enters viewport */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-primary/70">
            PROFILE
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Engineering Profile
          </h2>
        </motion.div>

        {/* Grid layout: 3 columns on large screens, responsive on mobile. Left side = bio (2 cols), right side = metrics (1 col) */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Bio Card - Main profile information with avatar and description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* GlassCard = transparent card with backdrop blur (glass morphism effect) */}
            <GlassCard className="h-full p-8" hover>
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* Profile Avatar - Displays first letter of name as a monogram */}
                <div className="flex-shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-primary/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="flex h-full w-full items-center justify-center bg-muted/50">
                      <span className="font-display text-4xl font-bold text-primary">
                        {profileData.name.charAt(0)} {/* First letter of name (M for Michael) */}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Content - Name, title, bio text, and status indicators */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">
                      {profileData.name}
                    </h3>
                    <p className="text-primary">{profileData.title}</p>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">
                    {profileData.bio}
                  </p>
                  {/* Status badges - Green dot indicates availability, location emoji for geography */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      {profileData.availability}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      📍 {profileData.location}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Metrics Cards - Right column showcasing key stats (220 Credits, 3 Deployments, 100% SLA) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Maps over metrics array from portfolioData to create cards dynamically */}
          {/* Staggered animation for each metric */}
            {profileData.metrics.map((metric, index) => (
              <GlassCard key={metric.label} className="p-6 text-center" hover>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {/* The number: 220, 3, 100% */}
                  <p className="font-display text-4xl font-bold text-primary">
                    {metric.value}
                  </p>
                  {/* The label: Credits, Deployments, SLA Uptime */}
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </p>
                </motion.div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
