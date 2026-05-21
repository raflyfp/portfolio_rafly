import { Mail, MessageSquare, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import SectionHeader from '../Components/SectionHeader';

function getWhatsappHref(baseUrl = '', message = '') {
    const encodedMessage = encodeURIComponent(message);

    if (!baseUrl || baseUrl === '#') {
        return '#';
    }

    if (baseUrl.includes('wa.me/')) {
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}text=${encodedMessage}`;
    }

    return baseUrl;
}

export default function ContactSection({ content }) {
    const [form, setForm] = useState({
        name: '',
        channel: 'email',
        message: '',
    });

    const contactMessage = useMemo(() => {
        const sender = form.name.trim() || 'Calon klien';
        const detail = form.message.trim() || 'Halo, saya ingin diskusi project dengan Anda.';

        return [
            `Halo ${content.contact_name || 'Rafly'},`,
            '',
            `Saya ${sender}.`,
            detail,
            '',
            'Terima kasih.',
        ].join('\n');
    }, [content.contact_name, form.name, form.message]);

    const emailHref = `mailto:${content.contact_email}?subject=${encodeURIComponent('Pesan dari Portfolio')}&body=${encodeURIComponent(contactMessage)}`;
    const whatsappHref = getWhatsappHref(content.contact_whatsapp, contactMessage);
    const submitHref = form.channel === 'email' ? emailHref : whatsappHref;
    const SubmitIcon = form.channel === 'email' ? Mail : MessageSquare;

    const updateField = (key, value) => {
        setForm((current) => ({ ...current, [key]: value }));
    };

    return (
        <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
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
                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-7 lg:p-8"
                >
                    <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="relative mx-auto w-full max-w-3xl">
                        <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
                            <label className="block">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">
                                    Nama
                                </span>
                                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                    <UserRound className="h-4 w-4 text-zinc-500" />
                                    <input
                                        value={form.name}
                                        onChange={(event) => updateField('name', event.target.value)}
                                        placeholder="Nama kamu"
                                        className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                                    />
                                </div>
                            </label>

                            <fieldset>
                                <legend className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">
                                    Kirim ke
                                </legend>
                                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                                    {[
                                        { value: 'email', label: 'Email', icon: Mail },
                                        { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                                    ].map((option) => {
                                        const Icon = option.icon;
                                        const active = form.channel === option.value;

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => updateField('channel', option.value)}
                                                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                                    active
                                                        ? 'border-cyan-100/25 bg-cyan-50 text-slate-950'
                                                        : 'border-white/10 bg-white/[0.055] text-white hover:border-cyan-100/25 hover:bg-cyan-200/10'
                                                }`}
                                            >
                                                {option.label}
                                                <Icon className="h-4 w-4" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            <label className="block">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">
                                    Pesan
                                </span>
                                <textarea
                                    value={form.message}
                                    onChange={(event) => updateField('message', event.target.value)}
                                    rows="6"
                                    placeholder="Tulis pesan kamu..."
                                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/40"
                                />
                            </label>

                            <a
                                href={submitHref}
                                target={form.channel === 'whatsapp' && submitHref !== '#' ? '_blank' : undefined}
                                rel={form.channel === 'whatsapp' && submitHref !== '#' ? 'noreferrer' : undefined}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-100/25 bg-cyan-50 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                            >
                                Kirim Pesan
                                <SubmitIcon className="h-4 w-4" />
                            </a>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
