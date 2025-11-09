<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpaceImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'space_id',
        'image_path',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    public function space(): BelongsTo
    {
        return $this->belongsTo(Space::class);
    }
}
