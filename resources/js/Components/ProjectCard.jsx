import { Code2, Maximize, Radio, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ActionLink from './ActionLink';
import TechLogo from './TechLogo';

const normalize = (value) => value.toLowerCase().replace(/\s+js$/, '').trim();

export default function ProjectCard({ project, index, skillLogos = {} }) {
    const cardRef = useRef(null);
    const modalContentRef = useRef(null);
    const modalVideoRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('image'); // 'video' | 'image'

    const hasVideo = Boolean(project.video);

    useEffect(() => {
        if (!modalOpen) {
            return undefined;
        }

        document.documentElement.classList.add('is-video-player-open');
        document.body.style.overflow = 'hidden';

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setModalOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.documentElement.classList.remove('is-video-player-open');
            document.body.style.overflow = '';
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [modalOpen]);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const openFullscreen = () => {
        if (modalType === 'video') {
            modalVideoRef.current?.requestFullscreen?.();
        } else {
            modalContentRef.current?.requestFullscreen?.();
        }
    };

    return (
        <>
            <motion.article
                ref={cardRef}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
                <div
                    className={`relative aspect-video overflow-hidden bg-zinc-900 ${project.thumbnail ? 'cursor-pointer' : ''}`}
                    onClick={() => project.thumbnail && openModal('image')}
                >
                    {project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={project.name}
                            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.28),transparent_34%),linear-gradient(135deg,#111827,#050506)]" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-45 mix-blend-screen transition-opacity duration-300 group-hover:opacity-20`} />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                            {project.category}
                        </span>
                        {project.thumbnail && (
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-cyan-100 backdrop-blur-md transition-transform group-hover:scale-110">
                                <Maximize className="h-4 w-4" />
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-semibold tracking-tight text-white">{project.name}</h3>
                    <p className="mt-3 min-h-24 text-sm leading-7 text-zinc-400">{project.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-300"
                            >
                                <TechLogo name={tech} logoUrl={skillLogos[tech.toLowerCase()] || skillLogos[normalize(tech)]} className="h-4 w-4" />
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {project.github && project.github !== '#' && (
                            <ActionLink href={project.github} icon={Code2} variant="secondary">
                                GitHub
                            </ActionLink>
                        )}
                        {project.video && (
                            <button
                                type="button"
                                onClick={() => openModal('video')}
                                className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${
                                    project.demo && project.demo !== '#'
                                        ? 'border-white/10 bg-white/[0.055] text-white backdrop-blur-xl hover:border-cyan-100/25 hover:bg-cyan-200/10 hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]'
                                        : 'border-cyan-100/25 bg-cyan-50 text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.2)] hover:bg-cyan-200 hover:shadow-[0_0_44px_rgba(34,211,238,0.34)]'
                                }`}
                            >
                                {project.demo && project.demo !== '#' ? 'Watch Video' : 'Full Preview'}
                                <Radio className="h-4 w-4" strokeWidth={2.2} />
                            </button>
                        )}
                        {project.demo && project.demo !== '#' && (
                            <ActionLink href={project.demo} variant="primary">
                                {project.video ? 'Live Demo' : 'Full Preview'}
                            </ActionLink>
                        )}
                    </div>
                </div>
            </motion.article>

            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md sm:px-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${project.name} preview`}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setModalOpen(false);
                        }
                    }}
                >
                    <div className="project-video-player w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                            <h3 className="min-w-0 truncate text-sm font-semibold text-white sm:text-base">
                                {project.name} {modalType === 'image' && '- Thumbnail'}
                            </h3>
                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    onClick={openFullscreen}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
                                    aria-label="Fullscreen"
                                >
                                    <Maximize className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div ref={modalContentRef} className={`bg-black ${modalType === 'video' ? 'aspect-video' : 'h-[75vh] flex items-center justify-center p-4'}`}>
                            {modalType === 'video' && project.video ? (
                                <video
                                    ref={modalVideoRef}
                                    className="h-full w-full"
                                    src={project.video}
                                    poster={project.thumbnail}
                                    controls
                                    playsInline
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={project.thumbnail}
                                    alt={project.name}
                                    className="max-h-full max-w-full rounded-md object-contain shadow-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
