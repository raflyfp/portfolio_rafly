import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-12 max-w-4xl text-center"
        >
            <span className="text-xs font-bold uppercase tracking-[0.32em] text-cyan-300/80">{eyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            {description && <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{description}</p>}
        </motion.div>
    );
}
