import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import FieldError from '../../../Components/Admin/FieldError';
import AdminLayout from '../../../Layouts/AdminLayout';

const groups = [
    {
        title: 'Hero',
        fields: [
            ['nav_brand', 'Navbar Brand'],
            ['site_title', 'Browser Title'],
            ['hero_title', 'Hero Title'],
            ['hero_showcase_title', 'Hero Showcase Title', 'textarea'],
            ['hero_intro', 'Hero Intro', 'textarea'],
            ['hero_location', 'Hero Location'],
        ],
    },
    {
        title: 'About',
        fields: [
            ['about_eyebrow', 'Eyebrow'],
            ['about_title', 'Title'],
            ['about_description', 'Section Description', 'textarea'],
            ['about_body', 'Main Text', 'textarea'],
            ['about_secondary', 'Secondary Text', 'textarea'],
            ['about_highlights', 'Highlights', 'textarea'],
        ],
    },
    {
        title: 'Section Headers',
        fields: [
            ['skills_eyebrow', 'Skills Eyebrow'],
            ['skills_title', 'Skills Title'],
            ['skills_description', 'Skills Description', 'textarea'],
            ['experience_eyebrow', 'Experience Eyebrow'],
            ['experience_title', 'Experience Title'],
            ['experience_description', 'Experience Description', 'textarea'],
            ['projects_eyebrow', 'Projects Eyebrow'],
            ['projects_title', 'Projects Title'],
            ['projects_description', 'Projects Description', 'textarea'],
        ],
    },
    {
        title: 'Contact & Footer',
        fields: [
            ['contact_eyebrow', 'Contact Eyebrow'],
            ['contact_title', 'Contact Title'],
            ['contact_description', 'Contact Description', 'textarea'],
            ['contact_name', 'Contact Name'],
            ['contact_body', 'Contact Body', 'textarea'],
            ['contact_email', 'Contact Email'],
            ['contact_whatsapp', 'WhatsApp URL'],
            ['social_github', 'GitHub URL'],
            ['social_linkedin', 'LinkedIn URL'],
            ['social_instagram', 'Instagram URL'],
            ['footer_left', 'Footer Left'],
            ['footer_right', 'Footer Right'],
        ],
    },
];

export default function HomeContentEdit({ content }) {
    const { data, setData, post, processing, errors } = useForm(content);

    const submit = (event) => {
        event.preventDefault();
        post('/admin/home-content', { preserveScroll: true });
    };

    return (
        <AdminLayout title="Home Content">
            <Head title="Home Content" />

            <form onSubmit={submit} className="grid gap-6">
                {groups.map((group) => (
                    <section
                        key={group.title}
                        className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
                    >
                        <h2 className="text-xl font-semibold text-white">{group.title}</h2>
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            {group.fields.map(([key, label, type]) => (
                                <label key={key} className={type === 'textarea' ? 'block md:col-span-2' : 'block'}>
                                    <span className="text-sm font-medium text-zinc-300">{label}</span>
                                    {type === 'textarea' ? (
                                        <textarea
                                            value={data[key] || ''}
                                            onChange={(event) => setData(key, event.target.value)}
                                            rows="4"
                                            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                        />
                                    ) : (
                                        <input
                                            value={data[key] || ''}
                                            onChange={(event) => setData(key, event.target.value)}
                                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                                        />
                                    )}
                                    <FieldError message={errors[key]} />
                                </label>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="sticky bottom-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black shadow-2xl shadow-black/40 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save className="h-5 w-5" />
                        {processing ? 'Saving...' : 'Save Home Content'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
