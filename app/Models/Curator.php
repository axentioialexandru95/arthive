<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curator extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'experience',
        'location',
        'exhibitions_count',
        'followers_count',
    ];

    protected function casts(): array
    {
        return [
            'exhibitions_count' => 'integer',
            'followers_count' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function exhibitions(): HasMany
    {
        return $this->hasMany(Exhibition::class);
    }

    public function followers(): HasMany
    {
        return $this->hasMany(Follow::class, 'following_id', 'user_id')
            ->where('following_type', 'Curator');
    }
}
