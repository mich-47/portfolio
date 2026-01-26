import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileData } from "@/data/portfolioData";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { icon: Github, href: profileData.social.github, label: "GitHub" },
    { icon: Linkedin, href: profileData.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: profileData.social.twitter, label: "Twitter" },
  ];

  return (
    <section id="contact" className="relative py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-primary/70">
            CONTACT PROTOCOL
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            Initiate Contact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
            Discuss systems, engineering challenges, or deployment opportunities.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="glass-button border-muted bg-muted/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="glass-button border-muted bg-muted/30 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={6}
                    className="glass-button resize-none border-muted bg-muted/30 focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 font-mono font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground border-2 border-primary relative hover:bg-primary/90 transition-all disabled:opacity-50"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)"
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? "Transmitting..." : "Transmit Message"}
                    <Send className="h-4 w-4" />
                  </span>
                </button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col gap-6">
              {/* Info Card */}
              <GlassCard className="flex-1 p-6" hover>
                <h3 className="mb-6 font-display text-xl font-semibold">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span>{profileData.email}</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-sm font-medium">Connect with me</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--glow-primary))]"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Availability Card */}
              <GlassCard className="p-6" hover>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>
                  <span className="font-medium text-green-400">
                    {profileData.availability}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  I'm currently open to new opportunities and exciting projects.
                  Let's build something amazing together.
                </p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
