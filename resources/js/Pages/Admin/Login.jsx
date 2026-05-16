import { Head, useForm } from '@inertiajs/react';
import { LockKeyhole, User } from 'lucide-react';
import FieldError from '../../Components/Admin/FieldError';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post('/login', { preserveScroll: true });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050506] px-4 py-12 text-white">
            <Head title="Admin Login" />
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]" />
            </div>

            <form
                onSubmit={submit}
                className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
            >
                <div className="mb-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-black text-black">
                        RF
                    </span>
                    <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">Admin Login</h1>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        Masuk untuk mengelola project portfolio secara dinamis.
                    </p>
                </div>

                <label className="block">
                    <span className="text-sm font-medium text-zinc-300">Username</span>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition focus-within:border-cyan-300/40">
                        <User className="h-5 w-5 text-zinc-500" />
                        <input
                            value={data.username}
                            onChange={(event) => setData('username', event.target.value)}
                            className="w-full border-0 bg-transparent text-white outline-none placeholder:text-zinc-600"
                            autoComplete="username"
                            placeholder="rafly"
                        />
                    </div>
                    <FieldError message={errors.username} />
                </label>

                <label className="mt-5 block">
                    <span className="text-sm font-medium text-zinc-300">Password</span>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition focus-within:border-cyan-300/40">
                        <LockKeyhole className="h-5 w-5 text-zinc-500" />
                        <input
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            className="w-full border-0 bg-transparent text-white outline-none placeholder:text-zinc-600"
                            autoComplete="current-password"
                            placeholder="Password"
                        />
                    </div>
                    <FieldError message={errors.password} />
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-7 w-full rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Memproses...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
