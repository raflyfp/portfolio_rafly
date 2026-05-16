<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Support\PortfolioContent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        foreach (PortfolioContent::projects() as $project) {
            Project::updateOrCreate(
                ['slug' => Str::slug($project['name'])],
                [
                    'title' => $project['name'],
                    'description' => $project['description'],
                    'tech_stack' => $project['stack'],
                    'github_url' => null,
                    'demo_url' => null,
                    'video_path' => null,
                    'thumbnail_path' => null,
                ],
            );
        }
    }
}
