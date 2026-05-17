import { Mail, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import ActionLink from '../Components/ActionLink';
import SectionHeader from '../Components/SectionHeader';

export default function ContactSection({ content }) {
    return (
        <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[96rem]">
                <SectionHeader
                    eyebrow={content.contact_eyebrow}
                    title={content.contact_title}
                    description={content.contact_description}
                />

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl sm:p-10"
                >
                    <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-white">{content.contact_name}</h3>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                                {content.contact_body}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <ActionLink href={`mailto:${content.contact_email}`} icon={Mail}>
                                Email
                            </ActionLink>
                            <ActionLink href={content.contact_whatsapp} icon={MessageSquare} variant="secondary">
                                WhatsApp
                            </ActionLink>
                            <ActionLink href="#projects" icon={Send} variant="secondary">
                                Projects
                            </ActionLink>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
