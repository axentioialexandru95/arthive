<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialization',
        'location',
        'views',
        'followers_count',
    ];

    protected function casts(): array
    {
        return [
            'views' => 'integer',
            'followers_count' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function albums(): HasMany
    {
        return $this->hasMany(Album::class);
    }

    public function exhibitions(): BelongsToMany
    {
        return $this->belongsToMany(Exhibition::class, 'exhibition_artist');
    }

    public function followers(): HasMany
    {
        return $this->hasMany(Follow::class, 'following_id', 'user_id')
            ->where('following_type', 'Artist');
    }
}
