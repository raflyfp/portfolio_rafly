import { motion } from 'framer-motion';
import SectionHeader from '../Components/SectionHeader';
import TechLogo from '../Components/TechLogo';

export default function SkillsSection({ skills, content }) {
    return (
        <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[96rem]">
                <SectionHeader
                    eyebrow={content.skills_eyebrow}
                    title={content.skills_title}
                    description={content.skills_description}
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                    {skills.map((skill, index) => {
                        const item = typeof skill === 'string' ? { name: skill, logo_url: null } : skill;

                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ delay: index * 0.04, duration: 0.45 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
                                        <TechLogo name={item.name} logoUrl={item.logo_url} className="h-6 w-6" />
                                    </span>
                                    <span className="text-left text-sm font-semibold text-zinc-200 transition group-hover:text-white">
                                        {item.name}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
