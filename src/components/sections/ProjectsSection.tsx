import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { projectsData } from "@/data/portfolioData";

export function ProjectsSection() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-primary/70">
            DEPLOYMENTS
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Project Archive
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
            Deployed systems and engineered solutions across embedded, industrial, and logistics domains.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard className="group h-full overflow-hidden p-0" tiltAmount={8}>
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay with links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={project.link}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                      aria-label="View live project"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a
                      href={project.github}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground transition-transform hover:scale-110"
                      aria-label="View source code"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Other Projects - Compact Grid */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="mb-8 text-center font-display text-2xl font-semibold">
              More Projects
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <GlassCard className="p-5" hover>
                    <div className="flex items-start justify-between">
                      <h4 className="font-display font-semibold">
                        {project.title}
                      </h4>
                      <div className="flex gap-2">
                        <a
                          href={project.link}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label="View live project"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <a
                          href={project.github}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label="View source code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-primary/80"
                        >
                          {tech}
                          {project.tech.indexOf(tech) < 2 && " ·"}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
