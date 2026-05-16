<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_and_update_project(): void
    {
        Storage::fake('public');

        $admin = User::factory()->create([
            'username' => 'rafly',
            'role' => 'admin',
        ]);

        $this->actingAs($admin)
            ->post('/admin/projects', [
                'title' => 'New Portfolio App',
                'slug' => '',
                'description' => 'Modern portfolio project.',
                'tech_stack' => 'Laravel, React, MySQL',
                'github_url' => 'https://github.com/example/project',
                'demo_url' => 'https://example.com',
                'video' => UploadedFile::fake()->create('preview.mp4', 1200, 'video/mp4'),
                'thumbnail' => UploadedFile::fake()->image('thumbnail.jpg'),
            ])
            ->assertRedirect();

        $project = Project::query()->where('title', 'New Portfolio App')->firstOrFail();

        $this->assertSame(['Laravel', 'React', 'MySQL'], $project->tech_stack);
        Storage::disk('public')->assertExists($project->video_path);
        Storage::disk('public')->assertExists($project->thumbnail_path);

        $this->actingAs($admin)
            ->post("/admin/projects/{$project->id}", [
                '_method' => 'put',
                'title' => 'Updated Portfolio App',
                'slug' => $project->slug,
                'description' => 'Updated modern portfolio project.',
                'tech_stack' => 'Laravel, Inertia, Tailwind',
                'github_url' => 'https://github.com/example/project',
                'demo_url' => 'https://example.com',
            ])
            ->assertRedirect();

        $project->refresh();

        $this->assertSame('Updated Portfolio App', $project->title);
        $this->assertSame(['Laravel', 'Inertia', 'Tailwind'], $project->tech_stack);
    }

    public function test_admin_can_update_profile(): void
    {
        Storage::fake('public');

        $admin = User::factory()->create([
            'username' => 'rafly',
            'email' => 'rafly@example.com',
            'password' => Hash::make('rfp'),
            'role' => 'admin',
        ]);

        $this->actingAs($admin)
            ->post('/admin/profile', [
                'name' => 'Rafly FP',
                'username' => 'raflyfp',
                'email' => 'raflyfp@example.com',
                'profile_photo' => UploadedFile::fake()->image('profile.png'),
            ])
            ->assertRedirect();

        $admin->refresh();

        $this->assertSame('Rafly FP', $admin->name);
        $this->assertSame('raflyfp', $admin->username);
        $this->assertSame('raflyfp@example.com', $admin->email);
        Storage::disk('public')->assertExists($admin->profile_photo_path);
    }
}
