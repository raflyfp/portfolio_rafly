import { Link, router, usePage } from '@inertiajs/react';
import { FolderKanban, LayoutDashboard, LogOut, Menu, UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import Toast from '../Components/Admin/Toast';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { label: 'Profile', href: '/admin/profile', icon: UserCircle },
];

export default function AdminLayout({ title, children }) {
    const { auth, flash } = usePage().props;
    const [open, setOpen] = useState(false);

    const logout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#050506] text-white">
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <Toast message={flash?.success} />

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-zinc-950/90 p-4 backdrop-blur-xl transition md:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        {auth?.user?.profile_photo_url ? (
                            <img
                                src={auth.user.profile_photo_url}
                                alt={auth.user.name}
                                className="h-10 w-10 rounded-2xl object-cover"
                            />
                        ) : (
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-black">
                                RF
                            </span>
                        )}
                        <div>
                            <p className="font-semibold text-white">Admin Panel</p>
                            <p className="text-xs text-zinc-500">{auth?.user?.username}</p>
                        </div>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] md:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="mt-8 grid gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = window.location.pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                    active
                                        ? 'bg-white text-black'
                                        : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    onClick={logout}
                    className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-rose-400/10 hover:text-rose-100"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </aside>

            <div className="relative z-10 md:pl-72">
                <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/65 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300/80">Portfolio CMS</p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">{title}</h1>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] md:hidden"
                            aria-label="Open sidebar"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
            </div>
        </div>
    );
}
