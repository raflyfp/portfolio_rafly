<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioHomeContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeContentController extends Controller
{
    public function edit(): Response
    {
        PortfolioHomeContent::seedDefaults();

        return Inertia::render('Admin/HomeContent/Edit', [
            'content' => PortfolioHomeContent::asArray(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $fields = array_keys(PortfolioHomeContent::defaults());

        $data = $request->validate(collect($fields)
            ->mapWithKeys(fn ($field) => [$field => ['nullable', 'string', 'max:5000']])
            ->all());

        foreach ($fields as $field) {
            PortfolioHomeContent::updateOrCreate(
                ['key' => $field],
                ['value' => $data[$field] ?? ''],
            );
        }

        return back()->with('success', 'Konten home berhasil diperbarui.');
    }
}
