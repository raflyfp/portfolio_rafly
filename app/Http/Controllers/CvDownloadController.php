<?php

namespace App\Http\Controllers;

use App\Models\PortfolioCv;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CvDownloadController extends Controller
{
    public function __invoke(string $language): StreamedResponse
    {
        abort_unless(in_array($language, ['id', 'en'], true), 404);

        $cv = PortfolioCv::query()
            ->where('language', $language)
            ->whereNotNull('file_path')
            ->firstOrFail();

        abort_unless(Storage::disk('public')->exists($cv->file_path), 404);

        return Storage::disk('public')->download($cv->file_path, "{$cv->title}.pdf");
    }
}
