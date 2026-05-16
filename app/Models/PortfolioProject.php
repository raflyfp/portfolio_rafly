<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'stack',
        'video',
        'github',
        'demo',
        'glow',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'stack' => 'array',
        ];
    }
}
