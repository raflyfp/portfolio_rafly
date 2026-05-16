<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioCv;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CvController extends Controller
{
    public function index(): Response
    {
        PortfolioCv::seedDefaults();

        return Inertia::render('Admin/Cvs/Index', [
            'cvs' => PortfolioCv::query()
                ->orderByRaw("case when language = 'id' then 0 else 1 end")
                ->get()
                ->map(fn (PortfolioCv $cv) => $this->serializeCv($cv)),
        ]);
    }

    public function update(Request $request, PortfolioCv $cv): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'language' => ['required', Rule::in(['id', 'en']), Rule::unique('portfolio_cvs', 'language')->ignore($cv->id)],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
        ]);

        if ($request->hasFile('file')) {
            if ($cv->file_path) {
                Storage::disk('public')->delete($cv->file_path);
            }

            $data['file_path'] = $request->file('file')->store('cvs', 'public');
        }

        unset($data['file']);

        $cv->update($data);

        return back()->with('success', 'CV berhasil diperbarui.');
    }

    public function destroy(PortfolioCv $cv): RedirectResponse
    {
        if ($cv->file_path) {
            Storage::disk('public')->delete($cv->file_path);
        }

        $cv->update(['file_path' => null]);

        return back()->with('success', 'File CV berhasil dihapus.');
    }

    private function serializeCv(PortfolioCv $cv): array
    {
        return [
            'id' => $cv->id,
            'language' => $cv->language,
            'language_label' => $cv->language === 'id' ? 'Bahasa Indonesia' : 'English',
            'title' => $cv->title,
            'file_name' => $cv->file_name,
            'download_url' => $cv->download_url,
        ];
    }
}
