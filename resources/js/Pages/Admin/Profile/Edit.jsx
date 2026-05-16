import { Head, useForm } from '@inertiajs/react';
import { Camera, KeyRound, Mail, Save, User } from 'lucide-react';
import FieldError from '../../../Components/Admin/FieldError';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function ProfileEdit({ profile }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: profile.name || '',
        username: profile.username || '',
        email: profile.email || '',
        profile_photo: null,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post('/admin/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset('profile_photo', 'current_password', 'password', 'password_confirmation'),
        });
    };

    return (
        <AdminLayout title="Profile">
            <Head title="Admin Profile" />

            <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            {profile.profile_photo_url ? (
                                <img
                                    src={profile.profile_photo_url}
                                    alt={profile.name}
                                    className="h-36 w-36 rounded-[32px] object-cover"
                                />
                            ) : (
                                <span className="flex h-36 w-36 items-center justify-center rounded-[32px] bg-white text-4xl font-black text-black">
                                    RF
                                </span>
                            )}
                            <span className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 text-cyan-200">
                                <Camera className="h-5 w-5" />
                            </span>
                        </div>

                        <h2 className="mt-8 text-2xl font-semibold text-white">{profile.name}</h2>
                        <p className="mt-2 text-sm text-zinc-500">@{profile.username}</p>
                    </div>

                    <label className="mt-8 block">
                        <span className="text-sm font-medium text-zinc-300">Foto Profile</span>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(event) => setData('profile_photo', event.target.files[0])}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-black"
                        />
                        <FieldError message={errors.profile_photo} />
                    </label>
                </div>

                <div className="grid gap-6">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                                <User className="h-5 w-5" />
                            </span>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Informasi Admin</h2>
                                <p className="text-sm text-zinc-500">Ubah nama, username, dan email login.</p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-medium text-zinc-300">Nama</span>
                                <input
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                />
                                <FieldError message={errors.name} />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-zinc-300">Username</span>
                                <input
                                    value={data.username}
                                    onChange={(event) => setData('username', event.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                />
                                <FieldError message={errors.username} />
                            </label>
                        </div>

                        <label className="mt-5 block">
                            <span className="text-sm font-medium text-zinc-300">Email</span>
                            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition focus-within:border-cyan-300/40">
                                <Mail className="h-5 w-5 text-zinc-500" />
                                <input
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    className="w-full border-0 bg-transparent text-white outline-none"
                                />
                            </div>
                            <FieldError message={errors.email} />
                        </label>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                                <KeyRound className="h-5 w-5" />
                            </span>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Password</h2>
                                <p className="text-sm text-zinc-500">Kosongkan jika tidak ingin mengganti password.</p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            <label className="block">
                                <span className="text-sm font-medium text-zinc-300">Password Saat Ini</span>
                                <input
                                    type="password"
                                    value={data.current_password}
                                    onChange={(event) => setData('current_password', event.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                />
                                <FieldError message={errors.current_password} />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-zinc-300">Password Baru</span>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(event) => setData('password', event.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                />
                                <FieldError message={errors.password} />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-zinc-300">Konfirmasi</span>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(event) => setData('password_confirmation', event.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save className="h-5 w-5" />
                            {processing ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
