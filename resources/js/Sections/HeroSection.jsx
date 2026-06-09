import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, MapPin, Rocket } from 'lucide-react';
import ActionLink from '../Components/ActionLink';
import TechLogo from '../Components/TechLogo';

function GitHubIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.25 9.25 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.91v2.8c0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
    );
}

function LinkedInIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M6.94 8.98H3.9V20h3.04V8.98ZM5.42 4a1.76 1.76 0 1 0 0 3.52A1.76 1.76 0 0 0 5.42 4Zm5.41 4.98H7.91V20h3.02v-5.45c0-1.43.27-2.82 2.05-2.82 1.75 0 1.77 1.64 1.77 2.91V20h3.03v-6.05c0-2.97-.64-5.25-4.11-5.25-1.67 0-2.79.91-3.25 1.78h-.04V8.98Z" />
        </svg>
    );
}

function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
            <rect width="15" height="15" x="4.5" y="4.5" rx="4.2" />
            <circle cx="12" cy="12" r="3.2" />
            <path d="M16.8 7.2h.01" strokeLinecap="round" />
        </svg>
    );
}

const SOCIAL_LINKS = [
    { label: 'GitHub', key: 'social_github', icon: GitHubIcon },
    { label: 'LinkedIn', key: 'social_linkedin', icon: LinkedInIcon },
    { label: 'Instagram', key: 'social_instagram', icon: InstagramIcon },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
};

const ORBIT_LIMIT = 8;

function normalizeUrl(value) {
    if (!value || value.trim() === '#') return '#';
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
}

function OrbitObject({ item }) {
    return (
        <motion.div
            animate={{ rotate: [item.angle, item.angle + 360] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: 'linear', delay: item.delay }}
            className="absolute rounded-full"
            style={{
                width: item.width,
                height: item.height,
            }}
            aria-hidden="true"
        >
            <motion.span
                animate={{ rotate: [-item.angle, -item.angle - 360], y: [0, -7, 0] }}
                transition={{
                    rotate: { duration: item.duration, repeat: Infinity, ease: 'linear', delay: item.delay },
                    y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute left-1/2 top-0 z-40 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
                <TechLogo
                    name={item.name}
                    logoUrl={item.logo_url}
                    className="h-9 w-9 drop-shadow-[0_0_16px_rgba(103,232,249,0.75)]"
                />
                <span className="sr-only">{item.name}</span>
            </motion.span>
        </motion.div>
    );
}

function HologramOrb({ photoUrl, orbitSkills = [] }) {
    const skillsWithLogos = orbitSkills.filter((skill) => skill.logo_url).slice(0, ORBIT_LIMIT);
    const skillObjects = skillsWithLogos.map((skill, index) => {
        const track = index % 4;
        const width = 390 + track * 52 + (index % 2) * 34;
        const height = 322 + track * 42 + (index % 3) * 20;

        return {
            ...skill,
            angle: (360 / Math.max(skillsWithLogos.length, 1)) * index + track * 10,
            delay: -index * 3.4,
            duration: 38 + track * 7 + index * 0.8,
            width: `clamp(${Math.round(width * 0.76)}px, ${Math.round(width / 15)}vw, ${width}px)`,
            height: `clamp(${Math.round(height * 0.78)}px, ${Math.round(height / 15)}vw, ${height}px)`,
        };
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.9, ease: 'easeOut' }}
            className="relative mx-auto flex min-h-[460px] w-full max-w-[600px] items-center justify-center sm:min-h-[540px]"
        >
            <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.2),rgba(168,85,247,0.08)_38%,transparent_68%)] blur-2xl"
            />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                className="hero-orbit-ring hero-orbit-ring-cyan absolute z-20 h-80 w-80 rounded-full border border-cyan-200/18 sm:h-[28rem] sm:w-[28rem]"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
                className="hero-orbit-ring hero-orbit-ring-fuchsia absolute z-20 h-72 w-96 rounded-[50%] border border-fuchsia-200/14 sm:h-96 sm:w-[32rem]"
            />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
                className="hero-orbit-ring hero-orbit-ring-slate absolute z-20 h-96 w-60 rounded-[50%] border border-white/10 sm:h-[31rem] sm:w-80"
            />
            {skillObjects.map((item) => (
                <OrbitObject key={item.name} item={item} />
            ))}

            {[0, 1, 2, 3, 4, 5].map((item) => (
                <motion.span
                    key={item}
                    animate={{
                        y: [0, item % 2 ? 12 : -12, 0],
                        opacity: [0.38, 0.9, 0.38],
                    }}
                    transition={{
                        duration: 4.8 + item * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: item * 0.25,
                    }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(103,232,249,0.95)]"
                    style={{
                        left: `${24 + ((item * 13) % 54)}%`,
                        top: `${18 + ((item * 17) % 58)}%`,
                    }}
                />
            ))}

            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-30 flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-950/35 shadow-[0_0_80px_rgba(34,211,238,0.26),inset_0_0_60px_rgba(168,85,247,0.16)] backdrop-blur-xl sm:h-64 sm:w-64"
            >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_22%,rgba(255,255,255,0.65),rgba(103,232,249,0.18)_18%,transparent_48%)]" />
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt="Rafly Faldiansyah Putra"
                        className="relative h-full w-full rounded-full object-cover"
                    />
                ) : (
                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(103,232,249,0.42),rgba(59,130,246,0.24)_36%,rgba(168,85,247,0.16)_62%,rgba(15,23,42,0.95))] text-5xl font-black text-white sm:text-6xl">
                        RF
                    </div>
                )}
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,transparent_28%,transparent_64%,rgba(34,211,238,0.16)_100%)] mix-blend-screen" />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-cyan-100/25" />
            </motion.div>
        </motion.div>
    );
}

function RocketTrail() {
    return (
        <div className="relative mt-5 h-9 w-full max-w-3xl overflow-hidden" aria-hidden="true">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-cyan-200/0 via-cyan-200/30 to-fuchsia-300/0" />
            <div className="rocket-runner absolute top-1/2 flex items-center">
                <span className="h-2 w-28 rounded-full bg-gradient-to-r from-transparent via-cyan-200/55 to-fuchsia-300/80 blur-[2px]" />
                <Rocket className="ml-[-2px] h-6 w-6 rotate-45 text-cyan-100 drop-shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
            </div>
            <motion.span
                animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.9, 1.2, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-fuchsia-200 shadow-[0_0_16px_rgba(217,70,239,0.8)]"
            />
        </div>
    );
}

function ScrollCue() {
    return (
        <motion.a
            href="#about"
            aria-label="Scroll to about section"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 transition duration-300 hover:text-cyan-200 sm:flex"
        >
            <span>Scroll</span>
            <span className="relative h-9 w-5 rounded-full border border-zinc-500/70 bg-black/10 shadow-[0_0_18px_rgba(34,211,238,0.08)] backdrop-blur-sm">
                <motion.span
                    animate={{ y: [0, 12, 0], opacity: [0.25, 0.9, 0.25] }}
                    transition={{ duration: 1.65, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_10px_rgba(103,232,249,0.9)]"
                />
            </span>
        </motion.a>
    );
}

export default function HeroSection({ content, photoUrl = null, orbitSkills = [] }) {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const [firstName, ...nameParts] = (content.hero_title || 'Rafly Faldiansyah Putra').split(' ');
    const displayName = {
        first: firstName || 'Rafly',
        rest: nameParts.join(' ') || 'Faldiansyah Putra',
    };

    return (
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
            <motion.div
                style={{ y }}
                className="pointer-events-none absolute left-1/2 top-20 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),rgba(168,85,247,0.08)_42%,transparent_70%)] blur-3xl"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />

            <div className="mx-auto grid w-full max-w-[96rem] items-center gap-16 lg:grid-cols-[1.12fr_0.88fr]">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="relative z-10"
                >
                    <h1 className="max-w-5xl text-4xl font-bold leading-[0.96] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                        <span className="block">{displayName.first}</span>
                        <span className="hero-name-gradient block bg-clip-text text-transparent">
                            {displayName.rest}
                        </span>
                    </h1>

                    <div className="mt-7 max-w-4xl">
                        <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-[2.65rem]">
                            {content.hero_showcase_title || 'Full Stack Developer Crafting Futuristic Web Experiences'}
                        </h2>
                        <RocketTrail />
                        <p className="mt-6 max-w-4xl text-base leading-8 text-zinc-300 sm:text-lg">
                            {content.hero_intro ||
                                'I design and build fast, responsive, and polished web applications with clean systems, smooth interactions, and a deep-space digital feel.'}
                        </p>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-100/15 bg-white/[0.045] px-4 py-2 text-sm font-medium text-zinc-200 shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:text-base">
                        <MapPin className="h-4 w-4 text-cyan-200" />
                        <span>{content.hero_location || 'Based in Sidoarjo, Indonesia'}</span>
                    </div>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <ActionLink href="#projects" icon={ArrowRight}>
                            View Projects
                        </ActionLink>
                        <ActionLink href="#contact" variant="secondary" icon={ArrowDown}>
                            Contact Me
                        </ActionLink>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        {SOCIAL_LINKS.map((item) => {
                            const Icon = item.icon;
                            const href = normalizeUrl(content[item.key]);

                            return (
                                <a
                                    key={item.label}
                                    href={href}
                                    aria-label={item.label}
                                    target={href === '#' ? undefined : '_blank'}
                                    rel={href === '#' ? undefined : 'noreferrer'}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-zinc-300 shadow-[0_0_22px_rgba(15,23,42,0.3)] backdrop-blur-xl transition duration-300 hover:border-cyan-200/35 hover:bg-cyan-200/10 hover:text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                <HologramOrb photoUrl={photoUrl} orbitSkills={orbitSkills} />
            </div>
            <ScrollCue />
        </section>
    );
}
