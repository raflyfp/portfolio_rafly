import { Code2, Maximize, Radio, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ActionLink from './ActionLink';
import TechLogo from './TechLogo';

const normalize = (value) => value.toLowerCase().replace(/\s+js$/, '').trim();

export default function ProjectCard({ project, index, skillLogos = {} }) {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const modalVideoRef = useRef(null);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);

    useEffect(() => {
        if (!project.video || shouldLoadVideo || !cardRef.current) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoadVideo(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '320px 0px' },
        );

        observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, [project.video, shouldLoadVideo]);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        if (isPlaying) {
            videoRef.current.play().catch(() => setIsPlaying(false));
        } else {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    const startPreview = () => setIsPlaying(true);
    const stopPreview = () => setIsPlaying(false);
    const hasVideo = Boolean(project.video);

    useEffect(() => {
        if (!playerOpen) {
            return undefined;
        }

        setIsPlaying(false);
        setShouldLoadVideo(true);
        document.documentElement.classList.add('is-video-player-open');
        document.body.style.overflow = 'hidden';

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setPlayerOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.documentElement.classList.remove('is-video-player-open');
            document.body.style.overflow = '';
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [playerOpen]);

    useEffect(() => {
        if (playerOpen && modalVideoRef.current) {
            modalVideoRef.current.play().catch(() => {});
        }
    }, [playerOpen]);

    const openPlayer = () => {
        if (hasVideo) {
            setPlayerOpen(true);
        }
    };

    const openFullscreen = () => {
        modalVideoRef.current?.requestFullscreen?.();
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
                onMouseEnter={startPreview}
                onMouseLeave={stopPreview}
                onFocus={startPreview}
                onBlur={stopPreview}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
                <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    {project.video ? (
                        <video
                            ref={videoRef}
                            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                            src={shouldLoadVideo ? project.video : undefined}
                            poster={project.thumbnail}
                            muted
                            loop
                            playsInline
                            preload="none"
                            onClick={() => setIsPlaying((value) => !value)}
                        />
                    ) : project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={project.name}
                            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.28),transparent_34%),linear-gradient(135deg,#111827,#050506)]" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-45 mix-blend-screen`} />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                            {project.category}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-cyan-100 backdrop-blur-md">
                            <Radio className="h-4 w-4" />
                        </span>
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

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <ActionLink href={project.github} icon={Code2} variant="secondary">
                            GitHub
                        </ActionLink>
                        {hasVideo ? (
                            <button
                                type="button"
                                onClick={openPlayer}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-100/25 bg-cyan-50 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.2)] transition duration-300 hover:bg-cyan-200 hover:shadow-[0_0_44px_rgba(34,211,238,0.34)]"
                            >
                                Full Preview
                                <Radio className="h-4 w-4" strokeWidth={2.2} />
                            </button>
                        ) : (
                            <ActionLink href={project.demo}>Full Preview</ActionLink>
                        )}
                    </div>
                </div>
            </motion.article>

            {playerOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md sm:px-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${project.name} video player`}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setPlayerOpen(false);
                        }
                    }}
                >
                    <div className="project-video-player w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                            <h3 className="min-w-0 truncate text-sm font-semibold text-white sm:text-base">{project.name}</h3>
                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    onClick={openFullscreen}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
                                    aria-label="Fullscreen video"
                                >
                                    <Maximize className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPlayerOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
                                    aria-label="Close video player"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="aspect-video bg-black">
                            <video
                                ref={modalVideoRef}
                                className="h-full w-full"
                                src={project.video}
                                poster={project.thumbnail}
                                controls
                                playsInline
                                autoPlay
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
