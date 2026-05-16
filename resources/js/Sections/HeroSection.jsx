import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Code2, Database, ServerCog } from 'lucide-react';
import ActionLink from '../Components/ActionLink';

const stackPills = ['Laravel', 'React', 'MySQL', 'Docker'];

export default function HeroSection() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

    return (
        <section id="home" className="relative flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
            <motion.div style={{ y }} className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
                        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
                        Fullstack Developer
                    </div>

                    <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Rafly Faldiansyah Putra
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
                        Seorang Fullstack Developer yang fokus pada pengembangan aplikasi web modern menggunakan
                        Laravel, React, MySQL, dan Docker.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <ActionLink href="#projects">View Projects</ActionLink>
                        <ActionLink href="#contact" variant="secondary" icon={ArrowDown}>
                            Contact Me
                        </ActionLink>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {stackPills.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-zinc-300"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.75, ease: 'easeOut' }}
                    className="relative"
                >
                    <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-cyan-300/20 via-fuchsia-400/10 to-emerald-300/20 blur-2xl" />
                    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="flex gap-2">
                                <span className="h-3 w-3 rounded-full bg-rose-400" />
                                <span className="h-3 w-3 rounded-full bg-amber-300" />
                                <span className="h-3 w-3 rounded-full bg-emerald-300" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                                Build System
                            </span>
                        </div>

                        <div className="grid gap-4 py-6">
                            {[
                                { icon: Code2, label: 'Frontend', value: 'React + Tailwind' },
                                { icon: ServerCog, label: 'Backend', value: 'Laravel REST API' },
                                { icon: Database, label: 'Database', value: 'MySQL' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.045] p-4"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm text-zinc-500">{item.label}</p>
                                        <p className="font-semibold text-white">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                            <p className="text-sm leading-7 text-cyan-50">
                                Dashboard management system, monitoring workflow, dan aplikasi web responsive dengan
                                antarmuka modern.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
