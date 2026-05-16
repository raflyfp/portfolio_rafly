<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::query()->count(),
                'videos' => Project::query()->whereNotNull('video_path')->count(),
                'thumbnails' => Project::query()->whereNotNull('thumbnail_path')->count(),
            ],
        ]);
    }

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $projects = Project::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(8)
            ->withQueryString()
            ->through(fn (Project $project) => $this->serializeProject($project));

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
        $data['slug'] = $data['slug'] ?: Project::uniqueSlug($data['title']);
        $data['tech_stack'] = $this->normalizeStack($data['tech_stack']);

        if ($request->hasFile('video')) {
            $data['video_path'] = $request->file('video')->store('projects/videos', 'public');
        }

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_path'] = $request->file('thumbnail')->store('projects/thumbnails', 'public');
        }

        unset($data['video'], $data['thumbnail']);

        Project::create($data);

        return back()->with('success', 'Project berhasil dibuat.');
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request, $project);
        $data['slug'] = $data['slug'] ?: Project::uniqueSlug($data['title'], $project->id);
        $data['tech_stack'] = $this->normalizeStack($data['tech_stack']);

        if ($request->hasFile('video')) {
            $this->deleteFile($project->video_path);
            $data['video_path'] = $request->file('video')->store('projects/videos', 'public');
        }

        if ($request->hasFile('thumbnail')) {
            $this->deleteFile($project->thumbnail_path);
            $data['thumbnail_path'] = $request->file('thumbnail')->store('projects/thumbnails', 'public');
        }

        unset($data['video'], $data['thumbnail']);

        $project->update($data);

        return back()->with('success', 'Project berhasil diperbarui.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->deleteFile($project->video_path);
        $this->deleteFile($project->thumbnail_path);
        $project->delete();

        return back()->with('success', 'Project berhasil dihapus.');
    }

    private function validated(Request $request, ?Project $project = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                'alpha_dash',
                Rule::unique('projects', 'slug')->ignore($project?->id),
            ],
            'description' => ['required', 'string', 'max:1200'],
            'tech_stack' => ['required', 'string', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'video' => ['nullable', 'file', 'mimes:mp4', 'max:51200'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);
    }

    private function normalizeStack(string $stack): array
    {
        return collect(explode(',', $stack))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();
    }

    private function serializeProject(Project $project): array
    {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'description' => $project->description,
            'tech_stack' => $project->tech_stack ?? [],
            'tech_stack_text' => implode(', ', $project->tech_stack ?? []),
            'github_url' => $project->github_url,
            'demo_url' => $project->demo_url,
            'video_url' => $project->video_url,
            'thumbnail_url' => $project->thumbnail_url,
            'created_at' => $project->created_at?->format('d M Y'),
        ];
    }

    private function deleteFile(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
