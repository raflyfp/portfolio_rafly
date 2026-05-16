import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import FieldError from '../../../Components/Admin/FieldError';
import Modal from '../../../Components/Admin/Modal';
import AdminLayout from '../../../Layouts/AdminLayout';

const emptyForm = { _method: '', period: '', title: '', description: '', sort_order: 0 };

export default function ExperiencesIndex({ experiences, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const { data, setData, post, reset, processing, errors, clearErrors } = useForm(emptyForm);
    const rows = useMemo(() => experiences.data || [], [experiences]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/admin/experiences', { search }, { preserveState: true, replace: true });
        }, 350);

        return () => clearTimeout(timeout);
    }, [search]);

    const openCreate = () => {
        setEditing(null);
        clearErrors();
        reset();
        setModalOpen(true);
    };

    const openEdit = (experience) => {
        setEditing(experience);
        clearErrors();
        setData({ _method: 'put', ...experience });
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
        post(editing ? `/admin/experiences/${editing.id}` : '/admin/experiences', {
            preserveScroll: true,
            onSuccess: closeModal,
        });
    };

    const confirmDelete = () => {
        router.delete(`/admin/experiences/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    return (
        <AdminLayout title="Experience">
            <Head title="Admin Experience" />

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Experience Timeline</h2>
                        <p className="mt-1 text-sm text-zinc-500">Atur timeline experience yang tampil di home.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                            <Search className="h-5 w-5 text-zinc-500" />
                            <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" placeholder="Search experience..." />
                        </label>
                        <button type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200">
                            <Plus className="h-5 w-5" />
                            New Experience
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Period</th>
                                <th className="px-5 py-4 font-semibold">Title</th>
                                <th className="px-5 py-4 font-semibold">Order</th>
                                <th className="px-5 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {rows.map((experience) => (
                                <tr key={experience.id} className="text-zinc-300">
                                    <td className="px-5 py-5 text-cyan-200">{experience.period}</td>
                                    <td className="px-5 py-5">
                                        <p className="font-semibold text-white">{experience.title}</p>
                                        <p className="mt-1 max-w-2xl truncate text-xs text-zinc-500">{experience.description}</p>
                                    </td>
                                    <td className="px-5 py-5 text-zinc-500">{experience.sort_order}</td>
                                    <td className="px-5 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => openEdit(experience)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition hover:bg-white/[0.12]" aria-label="Edit experience"><Edit3 className="h-4 w-4" /></button>
                                            <button type="button" onClick={() => setDeleting(experience)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-rose-200 transition hover:bg-rose-400/10" aria-label="Delete experience"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-white/10 p-5">
                    {experiences.links.map((link, index) => (
                        <Link key={`${link.label}-${index}`} href={link.url || '#'} preserveScroll className={`rounded-full border px-4 py-2 text-sm transition ${link.active ? 'border-white bg-white text-black' : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`}>
                            {link.label.replace('&laquo;', 'Prev').replace('&raquo;', 'Next')}
                        </Link>
                    ))}
                </div>
            </div>

            <Modal show={modalOpen} title={editing ? 'Edit Experience' : 'Create Experience'} onClose={closeModal}>
                <form onSubmit={submit} className="grid gap-5 p-6">
                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Period</span>
                            <input value={data.period} onChange={(event) => setData('period', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" />
                            <FieldError message={errors.period} />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Sort Order</span>
                            <input type="number" value={data.sort_order} onChange={(event) => setData('sort_order', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" />
                            <FieldError message={errors.sort_order} />
                        </label>
                    </div>
                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Title</span>
                        <input value={data.title} onChange={(event) => setData('title', event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" />
                        <FieldError message={errors.title} />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Description</span>
                        <textarea value={data.description} onChange={(event) => setData('description', event.target.value)} rows="4" className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40" />
                        <FieldError message={errors.description} />
                    </label>
                    <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                        <button type="button" onClick={closeModal} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]">Cancel</button>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200 disabled:opacity-60">{processing ? 'Saving...' : 'Save Experience'}</button>
                    </div>
                </form>
            </Modal>

            <Modal show={Boolean(deleting)} title="Delete Experience" onClose={() => setDeleting(null)}>
                <div className="p-6">
                    <p className="text-sm leading-7 text-zinc-300">Hapus experience <span className="font-semibold text-white">{deleting?.title}</span>?</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={() => setDeleting(null)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]">Cancel</button>
                        <button type="button" onClick={confirmDelete} className="rounded-2xl bg-rose-300 px-5 py-3 text-sm font-bold text-rose-950 transition hover:bg-rose-200">Delete</button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
