import { X } from 'lucide-react';

export default function Modal({ show, title, children, onClose }) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
            <div className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-300 transition hover:bg-white/[0.12] hover:text-white"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
