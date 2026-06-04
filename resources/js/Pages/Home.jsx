import { Head } from '@inertiajs/react';
import PortfolioLayout from '../Layouts/PortfolioLayout';
import AboutSection from '../Sections/AboutSection';
import ContactSection from '../Sections/ContactSection';
import ExperienceSection from '../Sections/ExperienceSection';
import Footer from '../Sections/Footer';
import HeroSection from '../Sections/HeroSection';
import ProjectsSection from '../Sections/ProjectsSection';
import SkillsSection from '../Sections/SkillsSection';
import GithubSection from '../Sections/GithubSection';

const fallbackSkills = [
    { name: 'Laravel', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { name: 'PHP', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'React JS', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'MySQL', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Docker', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Tailwind CSS', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'REST API', logo_url: '' },
    { name: 'Git', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Linux', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

const fallbackHomeContent = {
    site_title: 'Rafly Faldiansyah Putra - Fullstack Developer',
    nav_brand: 'Rafly.Dev',
    hero_title: 'Rafly Faldiansyah Putra',
    hero_showcase_title: 'Full Stack Developer Crafting Futuristic Web Experiences',
    hero_intro:
        'I design and build fast, responsive, and polished web applications with clean systems, smooth interactions, and a deep-space digital feel.',
    hero_location: 'Based in Sidoarjo, Indonesia',
    about_eyebrow: 'About Me',
    about_title: 'Membangun produk web yang rapi, cepat, dan mudah dipakai.',
    about_description:
        'Saya menggabungkan backend yang stabil dengan UI yang bersih untuk membuat aplikasi operasional yang nyaman digunakan setiap hari.',
    about_body:
        'Rafly Faldiansyah Putra adalah Fullstack Developer yang fokus pada pengembangan aplikasi web modern menggunakan Laravel, React, MySQL, dan Docker.',
    about_secondary:
        'Berpengalaman membangun dashboard management system, sistem monitoring, reminder dokumen, dan aplikasi berbasis web dengan UI modern serta responsive.',
    about_highlights:
        'Fullstack|Laravel, React, API, deployment workflow\nDashboard|Management system dan monitoring dokumen\nResponsive|UI modern untuk mobile, tablet, desktop',
    about_education_level: 'S1 Teknik Informatika',
    about_education_school: 'Universitas Trunojoyo Madura',
    about_education_period: '2020 - 2024',
    about_education_gpa: '3.75',
    skills_eyebrow: 'Skills',
    skills_title: 'Stack yang dipakai untuk membangun aplikasi modern.',
    skills_description: 'Fokus pada ekosistem Laravel, React, database relational, container workflow, dan integrasi API.',
    experience_eyebrow: 'Experience',
    experience_title: 'Pengalaman yang dekat dengan kebutuhan produk operasional.',
    experience_description: 'Mulai dari perancangan backend, dashboard admin, monitoring data, sampai tampilan frontend yang polished.',
    projects_eyebrow: 'Projects',
    projects_title: 'Showcase project dengan preview video.',
    projects_description: 'Kumpulan project fullstack yang menonjolkan dashboard, automation, data processing, dan management system.',
    github_eyebrow: 'Contributions',
    github_title: 'Aktivitas GitHub',
    github_description: 'Ringkasan kontribusi kode di repositori publik selama setahun terakhir.',
    contact_eyebrow: 'Contact',
    contact_title: 'Siap membangun aplikasi web berikutnya.',
    contact_description: 'Terbuka untuk kolaborasi project dashboard, sistem monitoring, company profile, dan aplikasi management berbasis web.',
    contact_name: 'Rafly Faldiansyah Putra',
    contact_body: 'Fullstack Developer untuk Laravel, React, MySQL, Docker, dashboard system, dan UI web modern yang responsive.',
    contact_email: 'hello@rafly.dev',
    contact_whatsapp: 'https://wa.me/',
    social_github: '#',
    social_linkedin: '#',
    social_instagram: '#',
    footer_left: '@ 2026 Rafly Faldiansyah Putra - All rights reserved.',
    // footer_right: 'Fullstack Developer',
};

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
    homeContent = fallbackHomeContent,
    skills = fallbackSkills,
    experiences = fallbackExperiences,
    projects = fallbackProjects,
    skillLogos = {},
    cvFiles = [],
    heroPhotoUrl = null,
}) {
    return (
        <PortfolioLayout cvFiles={cvFiles} brandName={homeContent.nav_brand} profilePhotoUrl={heroPhotoUrl}>
            <Head title={homeContent.site_title} />
            <HeroSection content={homeContent} photoUrl={heroPhotoUrl} orbitSkills={skills} />
            <AboutSection content={homeContent} />
            <SkillsSection skills={skills} content={homeContent} />
            <ExperienceSection experiences={experiences} content={homeContent} />
            <ProjectsSection projects={projects} content={homeContent} skillLogos={skillLogos} />
            <GithubSection content={homeContent} />
            <ContactSection content={homeContent} />
            <Footer content={homeContent} />
        </PortfolioLayout>
    );
}
