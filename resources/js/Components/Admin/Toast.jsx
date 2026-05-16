import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
    if (!message) {
        return null;
    }

    return (
        <div className="fixed right-4 top-24 z-[80] flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-100 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <CheckCircle2 className="h-5 w-5" />
            {message}
        </div>
    );
}
