import { Head, router, useForm } from '@inertiajs/react';
import { Download, FileText, Save, Trash2, Upload } from 'lucide-react';
import FieldError from '../../../Components/Admin/FieldError';
import AdminLayout from '../../../Layouts/AdminLayout';

function CvCard({ cv }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'post',
        title: cv.title || '',
        language: cv.language,
        file: null,
    });

    const submit = (event) => {
        event.preventDefault();

        post(`/admin/cvs/${cv.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset('file'),
        });
    };

    const deleteFile = () => {
        if (!window.confirm(`Hapus file ${cv.title}?`)) {
            return;
        }

        router.delete(`/admin/cvs/${cv.id}`, { preserveScroll: true });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
                        <FileText className="h-6 w-6" />
                    </span>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300/80">
                            {cv.language_label}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-white">{cv.title}</h2>
                    </div>
                </div>

                {cv.download_url && (
                    <a
                        href={cv.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-300 transition hover:bg-white/[0.12] hover:text-white"
                        aria-label="Download CV"
                    >
                        <Download className="h-5 w-5" />
                    </a>
                )}
            </div>

            <div className="mt-7 grid gap-5">
                <label className="block">
                    <span className="text-sm font-medium text-zinc-300">Judul Tombol</span>
                    <input
                        value={data.title}
                        onChange={(event) => setData('title', event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                    />
                    <FieldError message={errors.title} />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-zinc-300">Bahasa</span>
                    <select
                        value={data.language}
                        onChange={(event) => setData('language', event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                    >
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">English</option>
                    </select>
                    <FieldError message={errors.language} />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-zinc-300">File CV</span>
                    <input
                        type="file"
                        accept="application/pdf,.doc,.docx"
                        onChange={(event) => setData('file', event.target.files[0])}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-black"
                    />
                    <p className="mt-2 text-xs text-zinc-500">
                        Format: PDF, DOC, DOCX. Maksimal 10MB.
                    </p>
                    <FieldError message={errors.file} />
                </label>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
                    File saat ini:{' '}
                    <span className="font-medium text-white">{cv.file_name || 'Belum ada file'}</span>
                </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={deleteFile}
                    disabled={!cv.file_name}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Trash2 className="h-5 w-5" />
                    Delete File
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {data.file ? <Upload className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                    {processing ? 'Saving...' : 'Save CV'}
                </button>
            </div>
        </form>
    );
}

export default function CvsIndex({ cvs }) {
    return (
        <AdminLayout title="CV Files">
            <Head title="Admin CV Files" />

            <div className="mb-6 rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Download CV</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-400">
                    Upload dua versi CV yang akan muncul di tombol Download CV pada navbar portfolio:
                    Bahasa Indonesia dan English.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {cvs.map((cv) => (
                    <CvCard key={cv.id} cv={cv} />
                ))}
            </div>
        </AdminLayout>
    );
}
