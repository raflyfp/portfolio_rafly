import { Head } from '@inertiajs/react';
import PortfolioLayout from '../Layouts/PortfolioLayout';
import AboutSection from '../Sections/AboutSection';
import ContactSection from '../Sections/ContactSection';
import ExperienceSection from '../Sections/ExperienceSection';
import Footer from '../Sections/Footer';
import HeroSection from '../Sections/HeroSection';
import ProjectsSection from '../Sections/ProjectsSection';
import SkillsSection from '../Sections/SkillsSection';

const fallbackSkills = [
    'Laravel',
    'PHP',
    'React JS',
    'JavaScript',
    'MySQL',
    'Docker',
    'Tailwind CSS',
    'REST API',
    'Git',
    'Linux',
];

const fallbackExperiences = [
    {
        period: 'Backend Foundation',
        title: 'Laravel, MySQL, REST API',
        description: 'Merancang struktur data, endpoint API, autentikasi, dan proses bisnis untuk aplikasi web.',
    },
    {
        period: 'Frontend Interface',
        title: 'React, Inertia.js, Tailwind CSS',
        description: 'Membangun UI responsive dengan interaction flow yang cepat, konsisten, dan nyaman dipakai.',
    },
    {
        period: 'Delivery Workflow',
        title: 'Docker, Git, Linux',
        description: 'Menyiapkan workflow development, versioning, dan environment yang mudah dikembangkan.',
    },
];

const fallbackProjects = [
    {
        name: 'Sistem Manajemen Dokumen MSJ',
        category: 'Document System',
        description:
            'Aplikasi pengelolaan dokumen internal dengan alur pencarian, penyimpanan, dan pengarsipan yang lebih terstruktur.',
        stack: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
        video: '/videos/msj.mp4',
        github: '#',
        demo: '#',
        glow: 'from-cyan-300/60 via-blue-500/25 to-transparent',
    },
    {
        name: 'Dashboard Monitoring dan Reminder Dokumen',
        category: 'Monitoring',
        description:
            'Dashboard untuk memantau status dokumen, deadline, dan reminder agar proses administrasi berjalan tepat waktu.',
        stack: ['Laravel', 'REST API', 'MySQL', 'JavaScript'],
        video: '/videos/reminder.mp4',
        github: '#',
        demo: '#',
        glow: 'from-emerald-300/55 via-cyan-500/25 to-transparent',
    },
    {
        name: 'Web Scraping dan Clustering Berita',
        category: 'Data Processing',
        description:
            'Sistem scraping berita dan clustering data untuk membantu pengelompokan informasi berdasarkan topik dan kemiripan konten.',
        stack: ['PHP', 'MySQL', 'REST API', 'Linux'],
        video: '/videos/berita.mp4',
        github: '#',
        demo: '#',
        glow: 'from-fuchsia-300/55 via-violet-500/25 to-transparent',
    },
    {
        name: 'Company Profile & Management System',
        category: 'Business Web',
        description:
            'Website company profile modern yang dipadukan dengan panel management untuk mengelola konten dan data bisnis.',
        stack: ['Laravel', 'React JS', 'Docker', 'Tailwind CSS'],
        video: '/videos/company.mp4',
        github: '#',
        demo: '#',
        glow: 'from-amber-200/50 via-rose-500/25 to-transparent',
    },
];

export default function Home({
    skills = fallbackSkills,
    experiences = fallbackExperiences,
    projects = fallbackProjects,
}) {
    return (
        <PortfolioLayout>
            <Head title="Rafly Faldiansyah Putra - Fullstack Developer" />
            <HeroSection />
            <AboutSection />
            <SkillsSection skills={skills} />
            <ExperienceSection experiences={experiences} />
            <ProjectsSection projects={projects} />
            <ContactSection />
            <Footer />
        </PortfolioLayout>
    );
}
