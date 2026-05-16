<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioHomeContent extends Model
{
    protected $fillable = [
        'key',
        'value',
    ];

    public static function defaults(): array
    {
        return [
            'site_title' => 'Rafly Faldiansyah Putra - Fullstack Developer',
            'hero_badge' => 'Fullstack Developer',
            'hero_title' => 'Rafly Faldiansyah Putra',
            'hero_description' => 'Seorang Fullstack Developer yang fokus pada pengembangan aplikasi web modern menggunakan Laravel, React, MySQL, dan Docker.',
            'hero_stack' => 'Laravel, React, MySQL, Docker',
            'hero_panel_label' => 'Build System',
            'hero_panel_note' => 'Dashboard management system, monitoring workflow, dan aplikasi web responsive dengan antarmuka modern.',
            'about_eyebrow' => 'About Me',
            'about_title' => 'Membangun produk web yang rapi, cepat, dan mudah dipakai.',
            'about_description' => 'Saya menggabungkan backend yang stabil dengan UI yang bersih untuk membuat aplikasi operasional yang nyaman digunakan setiap hari.',
            'about_body' => 'Rafly Faldiansyah Putra adalah Fullstack Developer yang fokus pada pengembangan aplikasi web modern menggunakan Laravel, React, MySQL, dan Docker.',
            'about_secondary' => 'Berpengalaman membangun dashboard management system, sistem monitoring, reminder dokumen, dan aplikasi berbasis web dengan UI modern serta responsive.',
            'about_highlights' => "Fullstack|Laravel, React, API, deployment workflow\nDashboard|Management system dan monitoring dokumen\nResponsive|UI modern untuk mobile, tablet, desktop",
            'skills_eyebrow' => 'Skills',
            'skills_title' => 'Stack yang dipakai untuk membangun aplikasi modern.',
            'skills_description' => 'Fokus pada ekosistem Laravel, React, database relational, container workflow, dan integrasi API.',
            'experience_eyebrow' => 'Experience',
            'experience_title' => 'Pengalaman yang dekat dengan kebutuhan produk operasional.',
            'experience_description' => 'Mulai dari perancangan backend, dashboard admin, monitoring data, sampai tampilan frontend yang polished.',
            'projects_eyebrow' => 'Projects',
            'projects_title' => 'Showcase project dengan preview video.',
            'projects_description' => 'Kumpulan project fullstack yang menonjolkan dashboard, automation, data processing, dan management system.',
            'contact_eyebrow' => 'Contact',
            'contact_title' => 'Siap membangun aplikasi web berikutnya.',
            'contact_description' => 'Terbuka untuk kolaborasi project dashboard, sistem monitoring, company profile, dan aplikasi management berbasis web.',
            'contact_name' => 'Rafly Faldiansyah Putra',
            'contact_body' => 'Fullstack Developer untuk Laravel, React, MySQL, Docker, dashboard system, dan UI web modern yang responsive.',
            'contact_email' => 'hello@rafly.dev',
            'contact_whatsapp' => 'https://wa.me/',
            'footer_left' => 'Rafly Faldiansyah Putra',
            'footer_right' => 'Fullstack Developer',
        ];
    }

    public static function asArray(): array
    {
        $stored = self::query()->pluck('value', 'key')->all();

        return [...self::defaults(), ...$stored];
    }

    public static function seedDefaults(): void
    {
        foreach (self::defaults() as $key => $value) {
            self::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
