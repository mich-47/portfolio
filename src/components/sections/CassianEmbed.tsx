import { motion } from "framer-motion";

export const CassianEmbed = () => {
    return (
        <section id="cassian" className="py-20 relative overflow-hidden bg-black/50 backdrop-blur-sm border-t border-white/5">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-12"
                >
                    <span className="text-cyan-400 font-mono tracking-wider text-sm mb-4 block">
            /// CHIEF OF STAFF
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Meet C.A.S.S.I.A.N.
                    </h2>
                    <p className="text-gray-400 text-lg">
                        My custom-built AI Orchestrator. Powered by LangGraph, Llama-3, and
                        FastAPI. Ask him a question or give him a directive below.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,255,255,0.15)] bg-black/80">
                        {/* 
              This is the live URL deployed via Render.
            */}
                        <iframe
                            src="https://c-a-s-s-i-a-n-project.onrender.com/static/index.html"
                            className="w-full h-[750px] border-0"
                            title="C.A.S.S.I.A.N. Interactive Demo"
                            allow="microphone"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
