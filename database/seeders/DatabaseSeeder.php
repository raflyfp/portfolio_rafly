<?php

namespace Database\Seeders;

use App\Models\PortfolioExperience;
use App\Models\PortfolioCv;
use App\Models\PortfolioHomeContent;
use App\Models\PortfolioProject;
use App\Models\PortfolioSkill;
use App\Support\PortfolioContent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            ProjectSeeder::class,
        ]);

        PortfolioHomeContent::seedDefaults();
        PortfolioCv::seedDefaults();

        foreach (PortfolioContent::skills() as $index => $skill) {
            PortfolioSkill::updateOrCreate(
                ['name' => $skill['name']],
                [
                    'logo_url' => $skill['logo_url'],
                    'sort_order' => $index + 1,
                ],
            );
        }

        foreach (PortfolioContent::experiences() as $index => $experience) {
            PortfolioExperience::updateOrCreate(
                ['title' => $experience['title']],
                [...$experience, 'sort_order' => $index + 1],
            );
        }

        foreach (PortfolioContent::projects() as $index => $project) {
            PortfolioProject::updateOrCreate(
                ['name' => $project['name']],
                [...$project, 'sort_order' => $index + 1],
            );
        }
    }
}
