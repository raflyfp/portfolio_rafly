<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class SupabaseProjectApi
{
    public function __construct(private readonly SupabaseStorageApi $storage)
    {
    }

    public function paginate(?string $search = null, int $perPage = 8, int $page = 1): LengthAwarePaginator
    {
        $page = max($page, 1);
        $from = ($page - 1) * $perPage;
        $to = $from + $perPage - 1;

        $query = $this->baseQuery($search);

        $response = $this->request()
            ->withHeaders([
                'Prefer' => 'count=exact',
                'Range-Unit' => 'items',
                'Range' => "{$from}-{$to}",
            ])
            ->get('/projects', $query)
            ->throw();

        $rows = collect($response->json() ?? [])
            ->map(fn (array $project) => $this->serialize($project))
            ->all();

        return new LengthAwarePaginator(
            $rows,
            $this->totalFromContentRange($response->header('Content-Range'), count($rows)),
            $perPage,
            $page,
            [
                'path' => request()->url(),
                'query' => request()->query(),
            ],
        );
    }

    public function latest(int $limit = 100): array
    {
        return collect($this->request()
            ->get('/projects', [
                'select' => '*',
                'order' => 'sort_order.asc,created_at.desc',
                'limit' => $limit,
            ])
            ->throw()
            ->json() ?? [])
            ->map(fn (array $project) => $this->serialize($project))
            ->all();
    }

    public function stats(): array
    {
        return [
            'projects' => $this->count(),
            'videos' => $this->count(['video_path' => 'not.is.null']),
            'thumbnails' => $this->count(['thumbnail_path' => 'not.is.null']),
        ];
    }

    public function find(string|int $id): ?array
    {
        $project = $this->request()
            ->get('/projects', [
                'select' => '*',
                'id' => "eq.{$id}",
                'limit' => 1,
            ])
            ->throw()
            ->json();

        return $project ? $this->serialize($project[0]) : null;
    }

    public function create(array $data): array
    {
        $project = $this->request()
            ->withHeaders(['Prefer' => 'return=representation'])
            ->post('/projects?select=*', $data)
            ->throw()
            ->json();

        return $this->serialize($project[0]);
    }

    public function update(string|int $id, array $data): array
    {
        $project = $this->request()
            ->withHeaders(['Prefer' => 'return=representation'])
            ->patch("/projects?id=eq.{$id}&select=*", $data)
            ->throw()
            ->json();

        return $this->serialize($project[0]);
    }

    public function delete(string|int $id): void
    {
        $this->request()
            ->delete("/projects?id=eq.{$id}")
            ->throw();
    }

    public function slugExists(string $slug, string|int|null $ignoreId = null): bool
    {
        $query = [
            'select' => 'id',
            'slug' => "eq.{$slug}",
            'limit' => 1,
        ];

        if ($ignoreId !== null) {
            $query['id'] = "neq.{$ignoreId}";
        }

        return filled($this->request()->get('/projects', $query)->throw()->json());
    }

    public function uniqueSlug(string $title, string|int|null $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'project';
        $slug = $base;
        $counter = 2;

        while ($this->slugExists($slug, $ignoreId)) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function request(): PendingRequest
    {
        $url = $this->projectUrl();
        $key = (string) config('services.supabase.key');

        if ($url === '' || $key === '') {
            throw new RuntimeException('Supabase URL atau service role key belum diisi.');
        }

        return Http::baseUrl("{$url}/rest/v1")
            ->acceptJson()
            ->withHeaders([
                'apikey' => $key,
                'Authorization' => "Bearer {$key}",
                'Content-Type' => 'application/json',
            ]);
    }

    private function projectUrl(): string
    {
        $url = rtrim((string) config('services.supabase.url'), '/');

        return preg_replace('#/(rest|storage)/v1.*$#', '', $url) ?: $url;
    }

    private function baseQuery(?string $search = null): array
    {
        $query = [
            'select' => '*',
            'order' => 'sort_order.asc,created_at.desc',
        ];

        if (filled($search)) {
            $term = $this->escapeSearchTerm($search);
            $query['or'] = "(title.ilike.*{$term}*,description.ilike.*{$term}*,slug.ilike.*{$term}*)";
        }

        return $query;
    }

    private function count(array $filters = []): int
    {
        $response = $this->request()
            ->withHeaders([
                'Prefer' => 'count=exact',
                'Range-Unit' => 'items',
                'Range' => '0-0',
            ])
            ->get('/projects', array_merge(['select' => 'id'], $filters))
            ->throw();

        return $this->totalFromContentRange($response->header('Content-Range'), count($response->json() ?? []));
    }

    private function totalFromContentRange(?string $contentRange, int $fallback = 0): int
    {
        if ($contentRange && preg_match('/\/(\d+)$/', $contentRange, $matches)) {
            return (int) $matches[1];
        }

        return $fallback;
    }

    private function serialize(array $project): array
    {
        $techStack = Arr::wrap($project['tech_stack'] ?? []);

        return [
            'id' => $project['id'],
            'title' => $project['title'],
            'slug' => $project['slug'],
            'description' => $project['description'],
            'sort_order' => $project['sort_order'] ?? 0,
            'tech_stack' => $techStack,
            'tech_stack_text' => implode(', ', $techStack),
            'github_url' => $project['github_url'] ?? null,
            'demo_url' => $project['demo_url'] ?? null,
            'video_path' => $project['video_path'] ?? null,
            'thumbnail_path' => $project['thumbnail_path'] ?? null,
            'video_url' => $this->storage->publicUrl($project['video_path'] ?? null),
            'thumbnail_url' => $this->storage->publicUrl($project['thumbnail_path'] ?? null),
            'created_at' => filled($project['created_at'] ?? null)
                ? Carbon::parse($project['created_at'])->format('d M Y')
                : null,
        ];
    }

    private function escapeSearchTerm(string $search): string
    {
        return str_replace(['\\', '*', ',', '(', ')'], ['\\\\', '\\*', '\\,', '\\(', '\\)'], $search);
    }
}
