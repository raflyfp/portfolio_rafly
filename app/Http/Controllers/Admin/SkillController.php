<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioSkill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $skills = PortfolioSkill::query()
            ->when($search, fn ($query) => $query->where('name', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        PortfolioSkill::create($this->validated($request));

        return back()->with('success', 'Skill berhasil dibuat.');
    }

    public function update(Request $request, PortfolioSkill $skill): RedirectResponse
    {
        $skill->update($this->validated($request, $skill));

        return back()->with('success', 'Skill berhasil diperbarui.');
    }

    public function destroy(PortfolioSkill $skill): RedirectResponse
    {
        $skill->delete();

        return back()->with('success', 'Skill berhasil dihapus.');
    }

    private function validated(Request $request, ?PortfolioSkill $skill = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120', Rule::unique('portfolio_skills', 'name')->ignore($skill?->id)],
            'logo_url' => ['nullable', 'url', 'max:500'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:999'],
        ]);
    }
}
