import { Head, Link } from '@inertiajs/react';
import { Film, FolderKanban, Image } from 'lucide-react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ stats }) {
    const cards = [
        { label: 'Projects', value: stats.projects, icon: FolderKanban },
        { label: 'Video Preview', value: stats.videos, icon: Film },
        { label: 'Thumbnail', value: stats.thumbnails, icon: Image },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />
            <div className="grid gap-4 md:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                                <Icon className="h-5 w-5" />
                            </span>
                            <p className="mt-6 text-sm text-zinc-500">{card.label}</p>
                            <p className="mt-2 text-4xl font-semibold text-white">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Kelola portfolio dari satu dashboard.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                    Tambahkan project, upload video mp4, atur thumbnail, dan publish ke halaman portfolio publik.
                </p>
                <Link
                    href="/admin/projects"
                    className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200"
                >
                    Buka Projects
                </Link>
            </div>
        </AdminLayout>
    );
}
