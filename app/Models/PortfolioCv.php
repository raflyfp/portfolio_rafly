<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PortfolioCv extends Model
{
    protected $fillable = [
        'language',
        'title',
        'file_path',
    ];

    public function getDownloadUrlAttribute(): ?string
    {
        return $this->file_path ? route('cv.download', $this->language) : null;
    }

    public function getFileNameAttribute(): ?string
    {
        return $this->file_path ? basename($this->file_path) : null;
    }

    public static function defaults(): array
    {
        return [
            ['language' => 'id', 'title' => 'CV Bahasa Indonesia'],
            ['language' => 'en', 'title' => 'CV English'],
        ];
    }

    public static function seedDefaults(): void
    {
        foreach (self::defaults() as $cv) {
            self::firstOrCreate(
                ['language' => $cv['language']],
                ['title' => $cv['title']],
            );
        }
    }

    protected static function booted(): void
    {
        static::deleting(function (PortfolioCv $cv) {
            if ($cv->file_path) {
                Storage::disk('public')->delete($cv->file_path);
            }
        });
    }
}
