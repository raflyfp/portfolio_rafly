<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class SupabaseStorageApi
{
    public function upload(UploadedFile $file, string $directory): string
    {
        $path = trim($directory, '/').'/'.Str::uuid().'.'.$file->extension();
        $stream = fopen($file->getRealPath(), 'r');

        try {
            $this->request()
                ->withBody($stream, $file->getMimeType() ?: 'application/octet-stream')
                ->withHeaders([
                    'cache-control' => '3600',
                    'x-upsert' => 'false',
                ])
                ->post('/object/'.$this->bucket().'/'.$path)
                ->throw();
        } finally {
            if (is_resource($stream)) {
                fclose($stream);
            }
        }

        return $path;
    }

    public function delete(?string $path): void
    {
        if (blank($path)) {
            return;
        }

        $this->request()
            ->delete('/object/'.$this->bucket(), [
                'prefixes' => [$path],
            ])
            ->throw();
    }

    public function publicUrl(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        return $this->projectUrl()
            .'/storage/v1/object/public/'
            .$this->bucket()
            .'/'
            .ltrim($path, '/');
    }

    private function request(): PendingRequest
    {
        $url = $this->projectUrl();
        $key = (string) config('services.supabase.key');

        if ($url === '' || $key === '') {
            throw new RuntimeException('Supabase URL atau service role key belum diisi.');
        }

        return Http::baseUrl("{$url}/storage/v1")
            ->acceptJson()
            ->withHeaders([
                'apikey' => $key,
                'Authorization' => "Bearer {$key}",
            ]);
    }

    private function projectUrl(): string
    {
        $url = rtrim((string) config('services.supabase.url'), '/');

        return preg_replace('#/(rest|storage)/v1.*$#', '', $url) ?: $url;
    }

    private function bucket(): string
    {
        $bucket = (string) config('services.supabase.storage_bucket');

        if ($bucket === '') {
            throw new RuntimeException('Supabase storage bucket belum diisi.');
        }

        return $bucket;
    }
}
