import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import FieldError from '../../../Components/Admin/FieldError';
import Modal from '../../../Components/Admin/Modal';
import AdminLayout from '../../../Layouts/AdminLayout';

const emptyForm = {
    _method: '',
    title: '',
    slug: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: '',
    video: null,
    thumbnail: null,
};

export default function ProjectsIndex({ projects, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const { data, setData, post, reset, processing, errors, clearErrors } = useForm(emptyForm);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/admin/projects', { search }, { preserveState: true, replace: true });
        }, 350);

        return () => clearTimeout(timeout);
    }, [search]);

    const rows = useMemo(() => projects.data || [], [projects]);
    const pageLabel = (label) => label.replace('&laquo;', 'Prev').replace('&raquo;', 'Next');

    const openCreate = () => {
        setEditing(null);
        clearErrors();
        reset();
        setModalOpen(true);
    };

    const openEdit = (project) => {
        setEditing(project);
        clearErrors();
        setData({
            _method: 'put',
            title: project.title,
            slug: project.slug,
            description: project.description,
            tech_stack: project.tech_stack_text,
            github_url: project.github_url || '',
            demo_url: project.demo_url || '',
            video: null,
            thumbnail: null,
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

        if (editing) {
            post(`/admin/projects/${editing.id}`, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeModal,
            });
            return;
        }

        post('/admin/projects', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: closeModal,
        });
    };

    const confirmDelete = () => {
        if (!deleting) {
            return;
        }

        router.delete(`/admin/projects/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    return (
        <AdminLayout title="Projects">
            <Head title="Admin Projects" />

            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Portfolio Projects</h2>
                        <p className="mt-1 text-sm text-zinc-500">Create, edit, upload media, dan publish project.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                            <Search className="h-5 w-5 text-zinc-500" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                                placeholder="Search project..."
                            />
                        </label>
                        <button
                            type="button"
                            onClick={openCreate}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200"
                        >
                            <Plus className="h-5 w-5" />
                            New Project
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] text-left text-sm">
                        <thead className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">Project</th>
                                <th className="px-5 py-4 font-semibold">Tech Stack</th>
                                <th className="px-5 py-4 font-semibold">Media</th>
                                <th className="px-5 py-4 font-semibold">Created</th>
                                <th className="px-5 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {rows.map((project) => (
                                <tr key={project.id} className="text-zinc-300">
                                    <td className="px-5 py-5">
                                        <p className="font-semibold text-white">{project.title}</p>
                                        <p className="mt-1 text-xs text-zinc-500">/{project.slug}</p>
                                    </td>
                                    <td className="px-5 py-5">
                                        <div className="flex max-w-md flex-wrap gap-2">
                                            {project.tech_stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-zinc-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-zinc-400">
                                        <div className="grid gap-1">
                                            <span>{project.video_url ? 'Video ready' : 'No video'}</span>
                                            <span>{project.thumbnail_url ? 'Thumbnail ready' : 'No thumbnail'}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-zinc-500">{project.created_at}</td>
                                    <td className="px-5 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(project)}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition hover:bg-white/[0.12]"
                                                aria-label="Edit project"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleting(project)}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-rose-200 transition hover:bg-rose-400/10"
                                                aria-label="Delete project"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-5 py-12 text-center text-zinc-500">
                                        Project tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
                    <p className="text-sm text-zinc-500">
                        Showing {projects.from || 0} - {projects.to || 0} of {projects.total}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {projects.links.map((link, index) => (
                            <Link
                                key={`${link.label}-${index}`}
                                href={link.url || '#'}
                                preserveScroll
                                className={`rounded-full border px-4 py-2 text-sm transition ${
                                    link.active
                                        ? 'border-white bg-white text-black'
                                        : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'
                                } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                            >
                                {pageLabel(link.label)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={modalOpen} title={editing ? 'Edit Project' : 'Create Project'} onClose={closeModal}>
                <form onSubmit={submit} className="grid max-h-[78vh] gap-5 overflow-y-auto p-6">
                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Title</span>
                            <input
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                            />
                            <FieldError message={errors.title} />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Slug</span>
                            <input
                                value={data.slug}
                                onChange={(event) => setData('slug', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                placeholder="otomatis jika kosong"
                            />
                            <FieldError message={errors.slug} />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Description</span>
                        <textarea
                            value={data.description}
                            onChange={(event) => setData('description', event.target.value)}
                            rows="4"
                            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                        />
                        <FieldError message={errors.description} />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-zinc-300">Tech Stack</span>
                        <input
                            value={data.tech_stack}
                            onChange={(event) => setData('tech_stack', event.target.value)}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                            placeholder="Laravel, React, MySQL"
                        />
                        <FieldError message={errors.tech_stack} />
                    </label>

                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">GitHub URL</span>
                            <input
                                value={data.github_url}
                                onChange={(event) => setData('github_url', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                            />
                            <FieldError message={errors.github_url} />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Demo URL</span>
                            <input
                                value={data.demo_url}
                                onChange={(event) => setData('demo_url', event.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                            />
                            <FieldError message={errors.demo_url} />
                        </label>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Video MP4</span>
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={(event) => setData('video', event.target.files[0])}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-black"
                            />
                            <FieldError message={errors.video} />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Thumbnail</span>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(event) => setData('thumbnail', event.target.files[0])}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-black"
                            />
                            <FieldError message={errors.thumbnail} />
                        </label>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Saving...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal show={Boolean(deleting)} title="Delete Project" onClose={() => setDeleting(null)}>
                <div className="p-6">
                    <p className="text-sm leading-7 text-zinc-300">
                        Hapus project <span className="font-semibold text-white">{deleting?.title}</span>? File video
                        dan thumbnail yang terkait juga akan dihapus dari storage.
                    </p>
                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => setDeleting(null)}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08]"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="rounded-2xl bg-rose-300 px-5 py-3 text-sm font-bold text-rose-950 transition hover:bg-rose-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
