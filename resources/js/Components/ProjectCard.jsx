import { Code2, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionLink from './ActionLink';
import TechLogo from './TechLogo';

const normalize = (value) => value.toLowerCase().replace(/\s+js$/, '').trim();

export default function ProjectCard({ project, index, skillLogos = {} }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
            <div className="relative aspect-video overflow-hidden bg-zinc-900">
                {project.video ? (
                    <video
                        className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                        src={project.video}
                        poster={project.thumbnail}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
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
                    <ActionLink href={project.demo}>Live Demo</ActionLink>
                </div>
            </div>
        </motion.article>
    );
}
