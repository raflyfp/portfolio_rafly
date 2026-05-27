import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '../Components/SectionHeader';

function getInitials(title = '') {
    return title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join('');
}

function getResponsibilities(description = '') {
    const bulletMarker = /^\s*(?:[-*]|\u2022|\d+[.)])\s+/;
    const entries = [];
    let currentEntry = null;

    description
        .replace(/\r\n/g, '\n')
        .split('\n')
        .forEach((rawLine) => {
            const line = rawLine.trim();

            if (!line) {
                if (currentEntry) {
                    entries.push(currentEntry);
                    currentEntry = null;
                }

                return;
            }

            if (bulletMarker.test(line)) {
                if (currentEntry) {
                    entries.push(currentEntry);
                }

                currentEntry = {
                    type: 'bullet',
                    text: line.replace(bulletMarker, '').trim(),
                };

                return;
            }

            if (currentEntry) {
                currentEntry.text = `${currentEntry.text} ${line}`;
                return;
            }

            currentEntry = {
                type: 'paragraph',
                text: line,
            };
        });

    if (currentEntry) {
        entries.push(currentEntry);
    }

    return entries.filter((entry) => entry.text);
}

export default function ExperienceSection({ experiences, content }) {
    return (
        <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[96rem]">
                <SectionHeader
                    eyebrow={content.experience_eyebrow}
                    title={content.experience_title}
                    description={content.experience_description}
                />

                <div className="grid gap-5">
                    {experiences.map((item, index) => {
                        const responsibilities = getResponsibilities(item.description);

                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-120px' }}
                                transition={{ delay: index * 0.06, duration: 0.55, ease: 'easeOut' }}
                                className="relative overflow-hidden rounded-lg border border-cyan-100/15 bg-slate-900/55 p-6 shadow-[0_0_40px_rgba(8,47,73,0.16)] backdrop-blur-xl transition hover:border-cyan-100/30 hover:bg-slate-900/70"
                            >
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
                                <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-start">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white text-lg font-black text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.14)]">
                                        {getInitials(item.title) || 'EX'}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-cyan-50/75">{item.period}</p>

                                        <details className="group mt-4" open={index === 0}>
                                            <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-white transition hover:text-cyan-100">
                                                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                                                View Responsibilities
                                            </summary>
                                            <div className="mt-3 grid gap-3 text-sm leading-7 text-justify text-zinc-200">
                                                {responsibilities.map((responsibility) => (
                                                    responsibility.type === 'bullet' ? (
                                                        <p
                                                            key={responsibility.text}
                                                            className="relative pl-6 before:absolute before:left-1 before:top-[0.78em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-300"
                                                        >
                                                            {responsibility.text}
                                                        </p>
                                                    ) : (
                                                        <p key={responsibility.text}>{responsibility.text}</p>
                                                    )
                                                ))}
                                            </div>
                                        </details>
                                    </div>

                                    <span className="w-fit rounded-md border border-cyan-100/15 bg-white/[0.045] px-3 py-2 text-sm font-bold text-white">
                                        {item.period}
                                    </span>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
