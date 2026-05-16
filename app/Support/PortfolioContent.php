<?php

namespace App\Support;

class PortfolioContent
{
    public static function skills(): array
    {
        return [
            ['name' => 'Laravel', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'],
            ['name' => 'PHP', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'],
            ['name' => 'React JS', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'],
            ['name' => 'JavaScript', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'],
            ['name' => 'MySQL', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'],
            ['name' => 'Docker', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'],
            ['name' => 'Tailwind CSS', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'],
            ['name' => 'REST API', 'logo_url' => ''],
            ['name' => 'Git', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'],
            ['name' => 'Linux', 'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'],
        ];
    }

    public static function experiences(): array
    {
        return [
            [
                'period' => 'Backend Foundation',
                'title' => 'Laravel, MySQL, REST API',
                'description' => 'Merancang struktur data, endpoint API, autentikasi, dan proses bisnis untuk aplikasi web.',
            ],
            [
                'period' => 'Frontend Interface',
                'title' => 'React, Inertia.js, Tailwind CSS',
                'description' => 'Membangun UI responsive dengan interaction flow yang cepat, konsisten, dan nyaman dipakai.',
            ],
            [
                'period' => 'Delivery Workflow',
                'title' => 'Docker, Git, Linux',
                'description' => 'Menyiapkan workflow development, versioning, dan environment yang mudah dikembangkan.',
            ],
        ];
    }

    public static function projects(): array
    {
        return [
            [
                'name' => 'Sistem Manajemen Dokumen MSJ',
                'category' => 'Document System',
                'description' => 'Aplikasi pengelolaan dokumen internal dengan alur pencarian, penyimpanan, dan pengarsipan yang lebih terstruktur.',
                'stack' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
                'video' => '/videos/msj.mp4',
                'github' => '#',
                'demo' => '#',
                'glow' => 'from-cyan-300/60 via-blue-500/25 to-transparent',
            ],
            [
                'name' => 'Dashboard Monitoring dan Reminder Dokumen',
                'category' => 'Monitoring',
                'description' => 'Dashboard untuk memantau status dokumen, deadline, dan reminder agar proses administrasi berjalan tepat waktu.',
                'stack' => ['Laravel', 'REST API', 'MySQL', 'JavaScript'],
                'video' => '/videos/reminder.mp4',
                'github' => '#',
                'demo' => '#',
                'glow' => 'from-emerald-300/55 via-cyan-500/25 to-transparent',
            ],
            [
                'name' => 'Web Scraping dan Clustering Berita',
                'category' => 'Data Processing',
                'description' => 'Sistem scraping berita dan clustering data untuk membantu pengelompokan informasi berdasarkan topik dan kemiripan konten.',
                'stack' => ['PHP', 'MySQL', 'REST API', 'Linux'],
                'video' => '/videos/berita.mp4',
                'github' => '#',
                'demo' => '#',
                'glow' => 'from-fuchsia-300/55 via-violet-500/25 to-transparent',
            ],
            [
                'name' => 'Company Profile & Management System',
                'category' => 'Business Web',
                'description' => 'Website company profile modern yang dipadukan dengan panel management untuk mengelola konten dan data bisnis.',
                'stack' => ['Laravel', 'React JS', 'Docker', 'Tailwind CSS'],
                'video' => '/videos/company.mp4',
                'github' => '#',
                'demo' => '#',
                'glow' => 'from-amber-200/50 via-rose-500/25 to-transparent',
            ],
        ];
    }

    public static function all(): array
    {
        return [
            'skills' => self::skills(),
            'experiences' => self::experiences(),
            'projects' => self::projects(),
        ];
    }
}
