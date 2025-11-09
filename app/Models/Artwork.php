<?php

namespace App\Models;

use App\Medium;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Artwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_id',
        'title',
        'medium',
        'year',
        'image_path',
        'description',
        'views',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'views' => 'integer',
            'medium' => Medium::class,
        ];
    }

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }

    public function exhibitions(): BelongsToMany
    {
        return $this->belongsToMany(Exhibition::class, 'exhibition_artwork');
    }
}
