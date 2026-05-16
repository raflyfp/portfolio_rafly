import { motion } from 'framer-motion';
import SectionHeader from '../Components/SectionHeader';

export default function ExperienceSection({ experiences }) {
    return (
        <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <SectionHeader
                    eyebrow="Experience"
                    title="Pengalaman yang dekat dengan kebutuhan produk operasional."
                    description="Mulai dari perancangan backend, dashboard admin, monitoring data, sampai tampilan frontend yang polished."
                />

                <div className="relative">
                    <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/40 to-cyan-300/0 sm:block" />
                    <div className="grid gap-5">
                        {experiences.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-120px' }}
                                transition={{ delay: index * 0.08, duration: 0.55 }}
                                className="relative rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:ml-12"
                            >
                                <span className="absolute -left-[3.25rem] top-7 hidden h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.9)] sm:block" />
                                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300/80">
                                    {item.period}
                                </p>
                                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
