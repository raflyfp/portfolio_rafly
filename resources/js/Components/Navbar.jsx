import { useEffect, useState } from 'react';
import { ChevronDown, Download, Menu, Moon, Sun, X } from 'lucide-react';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

function ThemeToggle({ theme, onToggle }) {
    const isLight = theme === 'light';
    const Icon = isLight ? Moon : Sun;

    return (
        <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:border-cyan-200/35 hover:bg-cyan-200/10 hover:text-white"
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark mode' : 'Light mode'}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
}

export default function Navbar({ cvFiles = [], brandName = 'Rafly.Dev', profilePhotoUrl = null, theme = 'dark', onThemeToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cvOpen, setCvOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const downloadableCvs = cvFiles.filter((cv) => cv.download_url);
    const closeMenu = () => {
        setIsOpen(false);
        setCvOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
            <nav
                className={`mx-auto flex max-w-[96rem] items-center justify-between rounded-full border px-4 py-3 shadow-[0_0_40px_rgba(8,47,73,0.18)] transition duration-300 ${isScrolled
                        ? 'border-cyan-100/15 bg-slate-950/72 backdrop-blur-2xl'
                        : 'border-white/[0.08] bg-slate-950/35 backdrop-blur-xl'
                    }`}
            >
                <a href="#home" onClick={closeMenu} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-cyan-100/20 bg-cyan-50 text-sm font-black text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.24)]">
                        {profilePhotoUrl ? (
                            <img src={profilePhotoUrl} alt={brandName} className="h-full w-full object-cover" />
                        ) : (
                            'RF'
                        )}
                    </span>
                    <span className="hidden text-sm font-black tracking-wide text-white sm:block">
                        {brandName}
                    </span>
                </a>

                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-cyan-100/[0.07] hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setCvOpen((value) => !value)}
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.16)]"
                        >
                            <Download className="h-4 w-4" />
                            Download CV
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {cvOpen && (
                            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                                {downloadableCvs.length > 0 ? (
                                    downloadableCvs.map((cv) => (
                                        <a
                                            key={cv.language}
                                            href={cv.download_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setCvOpen(false)}
                                            className="block rounded-xl px-3 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                                        >
                                            {cv.title || cv.label}
                                        </a>
                                    ))
                                ) : (
                                    <span className="block rounded-xl px-3 py-3 text-sm text-zinc-500">
                                        CV belum tersedia
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}

                    <button
                        type="button"
                        onClick={() => setIsOpen((value) => !value)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.12]"
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="mx-auto mt-3 grid max-w-[96rem] gap-2 rounded-3xl border border-white/10 bg-zinc-950/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="grid gap-2 border-t border-white/10 pt-2">
                        <p className="px-4 pt-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300/70">
                            Download CV
                        </p>
                        {downloadableCvs.length > 0 ? (
                            downloadableCvs.map((cv) => (
                                <a
                                    key={cv.language}
                                    href={cv.download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMenu}
                                    className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                                >
                                    {cv.title || cv.label}
                                </a>
                            ))
                        ) : (
                            <span className="rounded-2xl px-4 py-3 text-sm text-zinc-500">CV belum tersedia</span>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
