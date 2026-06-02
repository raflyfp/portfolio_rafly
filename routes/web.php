<?php

use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\CvController;
use App\Http\Controllers\Admin\HomeContentController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CvDownloadController;
use App\Models\PortfolioCv;
use App\Models\PortfolioExperience;
use App\Models\PortfolioHomeContent;
use App\Models\PortfolioProject;
use App\Models\PortfolioSkill;
use App\Models\User;
use App\Services\SupabaseProjectApi;
use App\Support\PortfolioContent;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    $content = PortfolioContent::all();
    $content['homeContent'] = PortfolioHomeContent::defaults();
    $content['skillLogos'] = [];
    $content['cvFiles'] = [];
    $content['heroPhotoUrl'] = null;

    try {
        $profileUser = User::query()
            ->whereNotNull('profile_photo_path')
            ->orderByRaw("case when username = 'rafly' then 0 else 1 end")
            ->first(['profile_photo_path']);

        $content['heroPhotoUrl'] = $profileUser?->profile_photo_path
            ? Storage::url($profileUser->profile_photo_path)
            : null;

        PortfolioCv::seedDefaults();
        $content['cvFiles'] = PortfolioCv::query()
            ->orderByRaw("case when language = 'id' then 0 else 1 end")
            ->get()
            ->map(fn (PortfolioCv $cv) => [
                'language' => $cv->language,
                'label' => $cv->language === 'id' ? 'Bahasa Indonesia' : 'English',
                'title' => $cv->title,
                'download_url' => $cv->download_url,
            ])
            ->all();

        PortfolioHomeContent::seedDefaults();
        $content['homeContent'] = PortfolioHomeContent::asArray();

        $skills = PortfolioSkill::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['name', 'logo_url'])
            ->map(fn (PortfolioSkill $skill) => [
                'name' => $skill->name,
                'logo_url' => $skill->logo_url,
            ])
            ->all();

        $content['skillLogos'] = collect($skills)
            ->filter(fn ($skill) => filled($skill['logo_url']))
            ->flatMap(fn ($skill) => [
                strtolower($skill['name']) => $skill['logo_url'],
                strtolower(str_replace(' JS', '', $skill['name'])) => $skill['logo_url'],
            ])
            ->all();

        $content['skills'] = $skills ?: $content['skills'];

        $experiences = PortfolioExperience::query()
            ->orderBy('sort_order')
            ->get(['period', 'title', 'description'])
            ->all();

        $content['experiences'] = $experiences ?: $content['experiences'];

        if (filled(config('services.supabase.url')) && filled(config('services.supabase.key'))) {
            // Cache Supabase API response for 1 hour to prevent slow page load
            $supabaseProjects = \Illuminate\Support\Facades\Cache::remember('supabase_projects_latest', now()->addHour(), function () {
                return app(SupabaseProjectApi::class)->latest();
            });

            $projects = collect($supabaseProjects)
                ->map(fn (array $project, int $index) => [
                    'name' => $project['title'],
                    'category' => 'Portfolio Project',
                    'description' => $project['description'],
                    'stack' => $project['tech_stack'] ?? [],
                    'video' => $project['video_url'],
                    'thumbnail' => $project['thumbnail_url'],
                    'github' => $project['github_url'] ?: '#',
                    'demo' => $project['demo_url'] ?: '#',
                    'glow' => [
                        'from-cyan-300/60 via-blue-500/25 to-transparent',
                        'from-emerald-300/55 via-cyan-500/25 to-transparent',
                        'from-fuchsia-300/55 via-violet-500/25 to-transparent',
                        'from-amber-200/50 via-rose-500/25 to-transparent',
                    ][$index % 4],
                ])
                ->all();

            $content['projects'] = $projects ?: $content['projects'];
        } else {
            $projects = PortfolioProject::query()
                ->orderBy('sort_order')
                ->get(['name', 'category', 'description', 'stack', 'video', 'github', 'demo', 'glow'])
                ->all();

            $content['projects'] = $projects ?: $content['projects'];
        }
    } catch (\Throwable $e) {
        // If there's any error (like a missing table during initial setup), it will fallback here
        $content = PortfolioContent::all();
        $content['homeContent'] = PortfolioHomeContent::defaults();
        $content['skillLogos'] = [];
        $content['cvFiles'] = [];
        $content['heroPhotoUrl'] = null;
    }

    return Inertia::render('Home', $content);
});

Route::get('/cv/{language}/download', CvDownloadController::class)->name('cv.download');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [ProjectController::class, 'dashboard'])->name('dashboard');
        Route::get('/home-content', [HomeContentController::class, 'edit'])->name('home-content.edit');
        Route::post('/home-content', [HomeContentController::class, 'update'])->name('home-content.update');
        Route::get('/cvs', [CvController::class, 'index'])->name('cvs.index');
        Route::post('/cvs/{cv}', [CvController::class, 'update'])->name('cvs.update');
        Route::delete('/cvs/{cv}', [CvController::class, 'destroy'])->name('cvs.destroy');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::resource('skills', SkillController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('experiences', ExperienceController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('projects', ProjectController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });
});
