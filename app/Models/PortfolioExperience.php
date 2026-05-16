<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioExperience extends Model
{
    protected $fillable = [
        'period',
        'title',
        'description',
        'sort_order',
    ];
}
