<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioExperience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $experiences = PortfolioExperience::query()
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('period', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        PortfolioExperience::create($this->validated($request));

        return back()->with('success', 'Experience berhasil dibuat.');
    }

    public function update(Request $request, PortfolioExperience $experience): RedirectResponse
    {
        $experience->update($this->validated($request));

        return back()->with('success', 'Experience berhasil diperbarui.');
    }

    public function destroy(PortfolioExperience $experience): RedirectResponse
    {
        $experience->delete();

        return back()->with('success', 'Experience berhasil dihapus.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'period' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:180'],
            'description' => ['required', 'string', 'max:1200'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:999'],
        ]);
    }
}
