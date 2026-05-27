import { motion } from 'framer-motion';
import { GraduationCap, Star } from 'lucide-react';
import SectionHeader from '../Components/SectionHeader';

export default function AboutSection({ content }) {
    return (
        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[96rem]">
                <SectionHeader
                    eyebrow={content.about_eyebrow}
                    title={content.about_title}
                    description={content.about_description}
                />

                <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[3fr_1fr]">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-120px' }}
                        transition={{ duration: 0.6 }}
                        className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl"
                    >
                        <p className="text-lg leading-9 text-zinc-300">
                            {content.about_body}
                        </p>
                        <p className="mt-5 text-base leading-8 text-justify text-zinc-500">
                            {content.about_secondary}
                        </p>
                    </motion.div>

                    <motion.aside
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-120px' }}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100/15 bg-cyan-300/10 text-cyan-100">
                            <GraduationCap className="h-6 w-6" />
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-cyan-300/80">
                            Pendidikan
                        </p>
                        <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
                            {content.about_education_level ?? 'S1 Teknik Informatika'}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                            {content.about_education_school ?? 'Universitas Trunojoyo Madura'}
                        </p>
                        {content.about_education_period && (
                            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                                {content.about_education_period}
                            </p>
                        )}

                        <div className="mt-7 rounded-2xl border border-cyan-100/15 bg-black/20 p-4">
                            <div className="flex items-center gap-2 text-cyan-100">
                                <Star className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em]">GPA</span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-white">
                                {content.about_education_gpa ?? '3.75'}
                            </p>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
}
