import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { skillsData } from "@/data/portfolioData";

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-primary/70">
            TECHNICAL ARSENAL
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Competencies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
            Core engineering tools and methodologies for systems integration.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <GlassCard className="h-full p-6" hover>
                <h3 className="mb-6 font-display text-xl font-semibold text-primary">
                  {category.category}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                            ease: "easeOut",
                          }}
                        />
                        {/* Glow effect at the end */}
                        <motion.div
                          className="absolute inset-y-0 w-4 rounded-full bg-primary blur-sm"
                          initial={{ left: 0, opacity: 0 }}
                          whileInView={{
                            left: `calc(${skill.level}% - 8px)`,
                            opacity: 1,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Orbital decoration */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[600px] w-[600px] opacity-20">
            <div className="absolute inset-0 animate-orbit rounded-full border border-primary/30" />
            <div className="absolute inset-8 animate-orbit-reverse rounded-full border border-primary/20" />
            <div className="absolute inset-16 animate-orbit-slow rounded-full border border-primary/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
