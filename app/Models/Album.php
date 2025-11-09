<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'title',
        'description',
        'views',
    ];

    protected function casts(): array
    {
        return [
            'views' => 'integer',
        ];
    }

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }
}
