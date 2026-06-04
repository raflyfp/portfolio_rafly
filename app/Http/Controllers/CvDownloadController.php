<?php

namespace App\Http\Controllers;

use App\Models\PortfolioCv;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class CvDownloadController extends Controller
{
    public function __invoke(string $language): Response
    {
        abort_unless(in_array($language, ['id', 'en'], true), 404);

        $cv = PortfolioCv::query()
            ->where('language', $language)
            ->whereNotNull('file_path')
            ->firstOrFail();

        abort_unless(Storage::disk('public')->exists($cv->file_path), 404);

        return Storage::disk('public')->response($cv->file_path);
    }
}
