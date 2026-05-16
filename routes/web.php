<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\AuthController;
use App\Models\Project;
use App\Models\PortfolioExperience;
use App\Models\PortfolioProject;
use App\Models\PortfolioSkill;
use App\Support\PortfolioContent;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', function () {
    $content = PortfolioContent::all();

    try {
        if (Schema::hasTable('portfolio_skills')) {
            $skills = PortfolioSkill::query()->orderBy('sort_order')->pluck('name')->all();
            $content['skills'] = $skills ?: $content['skills'];
        }

        if (Schema::hasTable('portfolio_experiences')) {
            $experiences = PortfolioExperience::query()
                ->orderBy('sort_order')
                ->get(['period', 'title', 'description'])
                ->all();

            $content['experiences'] = $experiences ?: $content['experiences'];
        }

        if (Schema::hasTable('projects')) {
            $projects = Project::query()
                ->latest()
                ->get()
                ->map(fn (Project $project, int $index) => [
                    'name' => $project->title,
                    'category' => 'Portfolio Project',
                    'description' => $project->description,
                    'stack' => $project->tech_stack ?? [],
                    'video' => $project->video_url,
                    'thumbnail' => $project->thumbnail_url,
                    'github' => $project->github_url ?: '#',
                    'demo' => $project->demo_url ?: '#',
                    'glow' => [
                        'from-cyan-300/60 via-blue-500/25 to-transparent',
                        'from-emerald-300/55 via-cyan-500/25 to-transparent',
                        'from-fuchsia-300/55 via-violet-500/25 to-transparent',
                        'from-amber-200/50 via-rose-500/25 to-transparent',
                    ][$index % 4],
                ])
                ->all();

            $content['projects'] = $projects ?: $content['projects'];
        } elseif (Schema::hasTable('portfolio_projects')) {
            $projects = PortfolioProject::query()
                ->orderBy('sort_order')
                ->get(['name', 'category', 'description', 'stack', 'video', 'github', 'demo', 'glow'])
                ->all();

            $content['projects'] = $projects ?: $content['projects'];
        }
    } catch (\Throwable) {
        $content = PortfolioContent::all();
    }

    return Inertia::render('Home', $content);
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [ProjectController::class, 'dashboard'])->name('dashboard');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::resource('projects', ProjectController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });
});
