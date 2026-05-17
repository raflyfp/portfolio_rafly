import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import FieldError from '../../../Components/Admin/FieldError';
import Modal from '../../../Components/Admin/Modal';
import TechLogo from '../../../Components/TechLogo';
import AdminLayout from '../../../Layouts/AdminLayout';

const emptyForm = { _method: '', name: '', logo_url: '', logo_file: null, sort_order: 0 };

export default function SkillsIndex({ skills, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const { data, setData, post, reset, processing, errors, clearErrors } = useForm(emptyForm);
    const rows = useMemo(() => skills.data || [], [skills]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/admin/skills', { search }, { preserveState: true, replace: true });
        }, 350);

        return () => clearTimeout(timeout);
    }, [search]);

    const openCreate = () => {
        setEditing(null);
        clearErrors();
        reset();
        setModalOpen(true);
    };

    const openEdit = (skill) => {
        setEditing(skill);
        clearErrors();
        setData({
            _method: 'put',
            name: skill.name,
            logo_url: skill.logo_url || '',
            logo_file: null,
            sort_order: skill.sort_order || 0,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(null);
        reset();
        clearErrors();
    };

    const submit = (event) => {
        event.preventDefault();
        post(editing ? `/admin/skills/${editing.id}` : '/admin/skills', {
            preserveScroll: true,
            onSuccess: closeModal,
        });
    };

    const confirmDelete = () => {
        router.delete(`/admin/skills/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    return (
        <AdminLayout title="Skills">
            <Head title="Admin Skills" />

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Tech Stack Logos</h2>
                        <p className="mt-1 text-sm text-zinc-500">Atur skill dan logo yang tampil di home.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                            <Search className="h-5 w-5 text-zinc-500" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                                placeholder="Search skill..."
                            />
                        </label>
                        <button
                            type="button"
                            onClick={openCreate}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200"
                        >
                            <Plus className="h-5 w-5" />
                            New Skill
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Skill</th>
                                <th className="px-5 py-4 font-semibold">Logo URL</th>
                                <th className="px-5 py-4 font-semibold">Order</th>
                                <th className="px-5 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {rows.map((skill) => (
                                <tr key={skill.id} className="text-zinc-300">
                                    <td className="px-5 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                                                <TechLogo name={skill.name} logoUrl={skill.logo_url} className="h-6 w-6" />
                                            </span>
                                            <span className="font-semibold text-white">{skill.name}</span>
                                        </div>
                                    </td>
                                    <td className="max-w-md truncate px-5 py-5 text-zinc-500">{skill.logo_url || '-'}</td>
                                    <td className="px-5 py-5 text-zinc-500">{skill.sort_order}</td>
                                    <td className="px-5 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => openEdit(skill)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition hover:bg-white/[0.12]" aria-label="Edit skill">
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button type="button" onClick={() => setDeleting(skill)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-rose-200 transition hover:bg-rose-400/10" aria-label="Delete skill">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-white/10 p-5">
                    {skills.links.map((link, index) => (
                        <Link key={`${link.label}-${index}`} href={link.url || '#'} preserveScroll className={`rounded-full border px-4 py-2 text-sm transition ${link.active ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`}>
                            {link.label.replace('&laquo;', 'Prev').replace('&raquo;', 'Next')}
                        </Link>
                    ))}
                </div>
            </div>

            <Modal show={modalOpen} title={editing ? 'Edit Skill' : 'Create Skill'} onClose={closeModal}>
                <form onSubmit={submit} className="grid gap-5 p-6">
                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Name</span>
                        <input value={data.name} onChange={(event) => setData('name', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" />
                        <FieldError message={errors.name} />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Logo URL</span>
                        <input value={data.logo_url} onChange={(event) => setData('logo_url', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" placeholder="https://cdn.jsdelivr.net/..." />
                        <FieldError message={errors.logo_url} />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Upload Logo</span>
                        <input
                            key={editing?.id || 'new-skill-logo'}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            onChange={(event) => setData('logo_file', event.target.files[0])}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-black"
                        />
                        <p className="mt-2 text-xs text-zinc-500">Upload akan menggantikan Logo URL untuk skill ini.</p>
                        <FieldError message={errors.logo_file} />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Sort Order</span>
                        <input type="number" value={data.sort_order} onChange={(event) => setData('sort_order', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" />
                        <FieldError message={errors.sort_order} />
                    </label>
                    <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                        <button type="button" onClick={closeModal} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]">Cancel</button>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200 disabled:opacity-60">{processing ? 'Saving...' : 'Save Skill'}</button>
                    </div>
                </form>
            </Modal>

            <Modal show={Boolean(deleting)} title="Delete Skill" onClose={() => setDeleting(null)}>
                <div className="p-6">
                    <p className="text-sm leading-7 text-zinc-300">Hapus skill <span className="font-semibold text-white">{deleting?.name}</span>?</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => setDeleting(null)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]">Cancel</button>
                        <button type="button" onClick={confirmDelete} className="rounded-2xl bg-rose-300 px-5 py-3 text-sm font-bold text-rose-950 transition hover:bg-rose-200">Delete</button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
