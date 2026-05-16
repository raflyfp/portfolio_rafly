import { ArrowUpRight } from 'lucide-react';

export default function ActionLink({ href, children, icon: Icon = ArrowUpRight, variant = 'primary' }) {
    const variants = {
        primary: 'border-white/15 bg-white text-black hover:bg-cyan-200',
        secondary: 'border-white/10 bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/[0.1]',
    };

    return (
        <a
            href={href}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${variants[variant]}`}
        >
            {children}
            <Icon className="h-4 w-4" strokeWidth={2.2} />
        </a>
    );
}
