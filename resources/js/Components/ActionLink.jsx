import { ArrowUpRight } from 'lucide-react';

export default function ActionLink({ href, children, icon: Icon = ArrowUpRight, variant = 'primary', ...props }) {
    const variants = {
        primary:
            'border-cyan-100/25 bg-cyan-50 text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.2)] hover:bg-cyan-200 hover:shadow-[0_0_44px_rgba(34,211,238,0.34)]',
        secondary:
            'border-white/10 bg-white/[0.055] text-white backdrop-blur-xl hover:border-cyan-100/25 hover:bg-cyan-200/10 hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]',
    };

    return (
        <a
            href={href}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${variants[variant]}`}
            {...props}
        >
            {children}
            <Icon className="h-4 w-4" strokeWidth={2.2} />
        </a>
    );
}
