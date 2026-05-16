import { motion } from 'framer-motion';
import SectionHeader from '../Components/SectionHeader';

export default function SkillsSection({ skills }) {
    return (
        <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="Skills"
                    title="Stack yang dipakai untuk membangun aplikasi modern."
                    description="Fokus pada ekosistem Laravel, React, database relational, container workflow, dan integrasi API."
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.04, duration: 0.45 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-center backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                        >
                            <span className="text-sm font-semibold text-zinc-200 transition group-hover:text-white">
                                {skill}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
