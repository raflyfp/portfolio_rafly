import { motion } from 'framer-motion';
import SectionHeader from '../Components/SectionHeader';

const highlights = [
    { value: 'Fullstack', label: 'Laravel, React, API, deployment workflow' },
    { value: 'Dashboard', label: 'Management system dan monitoring dokumen' },
    { value: 'Responsive', label: 'UI modern untuk mobile, tablet, desktop' },
];

export default function AboutSection() {
    return (
        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow="About Me"
                    title="Membangun produk web yang rapi, cepat, dan mudah dipakai."
                    description="Saya menggabungkan backend yang stabil dengan UI yang bersih untuk membuat aplikasi operasional yang nyaman digunakan setiap hari."
                />

                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-120px' }}
                        transition={{ duration: 0.6 }}
                        className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl"
                    >
                        <p className="text-lg leading-9 text-zinc-300">
                            Rafly Faldiansyah Putra adalah Fullstack Developer yang fokus pada pengembangan aplikasi
                            web modern menggunakan Laravel, React, MySQL, dan Docker.
                        </p>
                        <p className="mt-5 text-base leading-8 text-zinc-500">
                            Berpengalaman membangun dashboard management system, sistem monitoring, reminder dokumen,
                            dan aplikasi berbasis web dengan UI modern serta responsive.
                        </p>
                    </motion.div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={item.value}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-120px' }}
                                transition={{ delay: index * 0.08, duration: 0.55 }}
                                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
                            >
                                <h3 className="text-2xl font-semibold text-white">{item.value}</h3>
                                <p className="mt-4 text-sm leading-7 text-zinc-400">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
