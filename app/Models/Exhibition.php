<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Exhibition extends Model
{
    use HasFactory;

    protected $fillable = [
        'curator_id',
        'space_id',
        'title',
        'slug',
        'description',
        'start_date',
        'end_date',
        'cover_image',
        'status',
        'views',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'views' => 'integer',
        ];
    }

    public function curator(): BelongsTo
    {
        return $this->belongsTo(Curator::class);
    }

    public function space(): BelongsTo
    {
        return $this->belongsTo(Space::class);
    }

    public function artists(): BelongsToMany
    {
        return $this->belongsToMany(Artist::class, 'exhibition_artist');
    }

    public function artworks(): BelongsToMany
    {
        return $this->belongsToMany(Artwork::class, 'exhibition_artwork');
    }
}
