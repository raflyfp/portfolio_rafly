<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SupabaseProjectApi;
use App\Services\SupabaseStorageApi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(
        private readonly SupabaseProjectApi $projects,
        private readonly SupabaseStorageApi $storage,
    )
    {
    }

    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => $this->projects->stats(),
        ]);
    }

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $projects = $this->projects
            ->paginate($search, 8, $request->integer('page', 1))
            ->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['tech_stack'] = $this->normalizeStack($data['tech_stack']);

        if ($request->hasFile('video')) {
            $data['video_path'] = $this->storage->upload($request->file('video'), 'projects/videos');
        }

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_path'] = $this->storage->upload($request->file('thumbnail'), 'projects/thumbnails');
        }

        unset($data['video'], $data['thumbnail']);

        try {
            $this->projects->create($data);
            \Illuminate\Support\Facades\Cache::forget('supabase_projects_latest');
        } catch (\Throwable $exception) {
            $this->deleteFile($data['video_path'] ?? null);
            $this->deleteFile($data['thumbnail_path'] ?? null);

            throw $exception;
        }

        return back()->with('success', 'Project berhasil dibuat.');
    }

    public function update(Request $request, string $project): RedirectResponse
    {
        $project = $this->projects->find($project);
        abort_unless($project, 404);

        $data = $this->validated($request, $project);
        $data['tech_stack'] = $this->normalizeStack($data['tech_stack']);
        $oldVideoPath = null;
        $oldThumbnailPath = null;

        if ($request->hasFile('video')) {
            $oldVideoPath = $project['video_path'];
            $data['video_path'] = $this->storage->upload($request->file('video'), 'projects/videos');
        }

        if ($request->hasFile('thumbnail')) {
            $oldThumbnailPath = $project['thumbnail_path'];
            $data['thumbnail_path'] = $this->storage->upload($request->file('thumbnail'), 'projects/thumbnails');
        }

        unset($data['video'], $data['thumbnail']);

        try {
            $this->projects->update($project['id'], $data);
            \Illuminate\Support\Facades\Cache::forget('supabase_projects_latest');
        } catch (\Throwable $exception) {
            $this->deleteFile($data['video_path'] ?? null);
            $this->deleteFile($data['thumbnail_path'] ?? null);

            throw $exception;
        }

        $this->deleteFile($oldVideoPath);
        $this->deleteFile($oldThumbnailPath);

        return back()->with('success', 'Project berhasil diperbarui.');
    }

    public function destroy(string $project): RedirectResponse
    {
        $project = $this->projects->find($project);
        abort_unless($project, 404);

        $this->deleteFile($project['video_path']);
        $this->deleteFile($project['thumbnail_path']);
        $this->projects->delete($project['id']);
        \Illuminate\Support\Facades\Cache::forget('supabase_projects_latest');

        return back()->with('success', 'Project berhasil dihapus.');
    }

    private function validated(Request $request, ?array $project = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                'alpha_dash',
            ],
            'description' => ['required', 'string', 'max:1200'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'tech_stack' => ['required', 'string', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'video' => ['nullable', 'file', 'mimes:mp4', 'max:51200'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);

        $ignoreId = $project['id'] ?? null;

        if ($data['slug'] === null || $data['slug'] === '') {
            $data['slug'] = $this->projects->uniqueSlug($data['title'], $ignoreId);
        } elseif ($this->projects->slugExists($data['slug'], $ignoreId)) {
            throw ValidationException::withMessages([
                'slug' => 'Slug sudah digunakan.',
            ]);
        }

        return $data;
    }

    private function normalizeStack(string $stack): array
    {
        return collect(explode(',', $stack))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();
    }

    private function deleteFile(?string $path): void
    {
        $this->storage->delete($path);
    }
}
