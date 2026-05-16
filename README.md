# Portfolio Rafly Faldiansyah Putra

Website portfolio modern fullstack berbasis Laravel, React Inertia, Tailwind CSS, MySQL, dan Vite. Project ini memiliki halaman portfolio publik dengan tema dark futuristic, particle space background, custom cursor, video showcase project, serta admin dashboard untuk mengelola konten secara dinamis.

## Tech Stack

- Laravel
- React via Inertia.js
- Tailwind CSS
- Framer Motion
- MySQL
- Vite
- Laravel session authentication
- Laravel storage upload

## Fitur Utama

- Portfolio publik responsive untuk mobile, tablet, dan desktop
- Dark mode futuristic dengan glassmorphism
- Animated space particle background
- Custom glowing cursor bertema space
- Smooth scrolling dan section transition animation
- Navbar modern dengan dropdown Download CV
- Hero, About, Skills, Experience, Projects, Contact, dan Footer
- Project card dengan video autoplay muted loop dan thumbnail fallback
- Skill/tech stack dengan logo masing-masing
- Admin dashboard SaaS style
- Login/logout admin tanpa Breeze atau Jetstream
- CRUD konten home
- CRUD project portfolio
- CRUD skills dan logo tech
- CRUD experience timeline
- CRUD CV Bahasa Indonesia dan CV English
- Update profile admin, foto profile, nama, username, email, dan password

## Admin Default

Seeder membuat admin default:

```txt
Username: rafly
Password: rfp
```

Password dibuat dengan Laravel Hash, bukan plaintext di database.

## Route Penting

Public:

```txt
/                       Portfolio home
/cv/id/download          Download CV Bahasa Indonesia
/cv/en/download          Download CV English
```

Authentication:

```txt
/login                   Login admin
/logout                  Logout admin, method POST
```

Admin:

```txt
/admin                   Dashboard
/admin/home-content      Edit teks dan konten section home
/admin/cvs               Upload dan kelola CV ID/EN
/admin/projects          CRUD project
/admin/skills            CRUD skill dan logo
/admin/experiences       CRUD experience
/admin/profile           Update profile admin
```

## Struktur Folder Penting

```txt
app/
  Http/Controllers/
    Admin/
      CvController.php
      ExperienceController.php
      HomeContentController.php
      ProjectController.php
      ProfileController.php
      SkillController.php
    AuthController.php
    CvDownloadController.php
  Models/
    PortfolioCv.php
    PortfolioExperience.php
    PortfolioHomeContent.php
    PortfolioSkill.php
    Project.php
    User.php
  Support/
    PortfolioContent.php

database/
  migrations/
  seeders/
    AdminSeeder.php
    DatabaseSeeder.php
    ProjectSeeder.php

resources/js/
  Components/
    Admin/
    Navbar.jsx
    ProjectCard.jsx
    SpaceBackground.jsx
    SpaceCursor.jsx
    TechLogo.jsx
  Layouts/
    AdminLayout.jsx
    PortfolioLayout.jsx
  Pages/
    Admin/
    Home.jsx
  Sections/

resources/css/
  app.css

public/videos/
  msj.mp4
  reminder.mp4
  berita.mp4
  company.mp4
```

## Setup Local

Install dependency PHP dan JavaScript:

```bash
composer install
npm install
```

Copy environment:

```bash
cp .env.example .env
php artisan key:generate
```

Sesuaikan database MySQL di `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio_cak
DB_USERNAME=root
DB_PASSWORD=
```

Buat database jika belum ada:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS portfolio_cak CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
```

Jalankan migration dan seeder:

```bash
php artisan migrate --seed
```

Buat storage symlink untuk file upload:

```bash
php artisan storage:link
```

Jalankan development server:

```bash
php artisan serve
npm run dev
```

Buka:

```txt
http://127.0.0.1:8000
```

## Build Production

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Pastikan server web mengarah ke folder `public/`.

## Database dan Seeder

Seeder utama:

- `AdminSeeder`: membuat admin default `rafly`
- `ProjectSeeder`: membuat data project awal
- `DatabaseSeeder`: memanggil seeder dan mengisi konten default home, skills, experience, dan CV

Konten default home tersimpan di tabel:

```txt
portfolio_home_contents
```

CV tersimpan di:

```txt
portfolio_cvs
```

Project admin tersimpan di:

```txt
projects
```

Skills dan experience home tersimpan di:

```txt
portfolio_skills
portfolio_experiences
```

## Upload File

File upload disimpan ke disk `public` Laravel.

Lokasi storage:

```txt
storage/app/public/
```

URL publik melalui symlink:

```txt
public/storage -> storage/app/public
```

Validasi upload:

- Project video: `mp4`, max 50MB
- Project thumbnail: `jpg`, `jpeg`, `png`, `webp`, max 5MB
- Profile photo: `jpg`, `jpeg`, `png`, `webp`, max 4MB
- CV: `pdf`, `doc`, `docx`, max 10MB

Jangan commit file upload user ke repository.

## Space Particle Theme

Efek ruang angkasa dibuat tanpa library tambahan agar bundle tetap ringan.

File utama:

- `resources/js/Components/SpaceBackground.jsx`: canvas starfield, parallax pointer, twinkle stars, constellation line, dan render loop.
- `resources/js/Components/SpaceCursor.jsx`: cursor custom dengan glowing dot dan ring.
- `resources/js/Layouts/PortfolioLayout.jsx`: memasang background dan cursor di website publik.
- `resources/css/app.css`: nebula gradient, shooting star animation, custom cursor style, dan reduced-motion fallback.

Yang diperlukan dalam pembuatannya:

- React `useEffect` dan `useRef` untuk lifecycle canvas dan cursor.
- Canvas 2D API untuk menggambar partikel/bintang real time.
- CSS keyframes untuk shooting stars.
- CSS media query `prefers-reduced-motion` agar animasi aman untuk user sensitif motion.
- CSS media query `pointer: fine` agar custom cursor hanya aktif di desktop/mouse.
- Tailwind utility class untuk layering, blur, glassmorphism, dan responsive layout.

Cara mengatur intensitas:

- Ubah `STAR_LAYERS` di `SpaceBackground.jsx` untuk jumlah, ukuran, dan kecepatan bintang.
- Ubah `.space-nebula` di `resources/css/app.css` untuk warna galaksi.
- Ubah `.shooting-star-*` untuk posisi, delay, dan durasi meteor.
- Ubah `.space-cursor-ring` dan `.space-cursor-dot` untuk ukuran dan warna cursor.

Catatan:

- Background memakai `pointer-events-none`, jadi tidak mengganggu klik button, card, dan navbar.
- Canvas membatasi device pixel ratio maksimal `2` agar tetap tajam tanpa terlalu berat.
- Event listener dan animation frame dibersihkan saat component unmount.

## Admin Dashboard

Admin dashboard memakai Inertia form dan Laravel validation. Semua route admin dilindungi middleware `auth`.

Keamanan auth:

- Password di-hash dengan Laravel Hash
- Login memakai session authentication
- Session regenerate setelah login
- Session invalidate saat logout
- CSRF protection dari Laravel web middleware
- Rate limiting login
- Validasi backend untuk semua form
- Tidak ada password hardcoded di frontend

## Testing

Jalankan test:

```bash
php artisan test
```

Test saat ini mencakup:

- Home page response
- CRUD project create/update
- Update profile admin
- Upload dan download CV

## Catatan Git

File yang wajib dipush:

- `app/`
- `database/migrations/`
- `database/seeders/`
- `resources/`
- `routes/`
- `tests/`
- `composer.json`
- `composer.lock`
- `package.json`
- `package-lock.json`
- `vite.config.js`

File yang tidak perlu dipush:

- `.env`
- `vendor/`
- `node_modules/`
- file upload di `storage/app/public/`
- cache Laravel

## Maintenance

Command yang sering dipakai:

```bash
php artisan migrate --seed
php artisan storage:link
php artisan route:list
php artisan config:clear
php artisan test
npm run build
```

Jika perubahan `.env` tidak terbaca:

```bash
php artisan config:clear
```

Jika upload tidak bisa dibuka:

```bash
php artisan storage:link
```
