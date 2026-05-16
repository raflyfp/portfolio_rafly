<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioSkill extends Model
{
    protected $fillable = [
        'name',
        'logo_url',
        'sort_order',
    ];
}
