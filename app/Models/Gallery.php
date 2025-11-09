<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'location',
        'rating',
        'followers_count',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:2',
            'followers_count' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function spaces(): HasMany
    {
        return $this->hasMany(Space::class);
    }

    public function followers(): HasMany
    {
        return $this->hasMany(Follow::class, 'following_id', 'user_id')
            ->where('following_type', 'Gallery');
    }
}
