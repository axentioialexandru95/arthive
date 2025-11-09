<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Space extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_id',
        'name',
        'description',
        'size_sqm',
        'price',
        'available',
        'facilities',
    ];

    protected function casts(): array
    {
        return [
            'size_sqm' => 'integer',
            'price' => 'decimal:2',
            'available' => 'boolean',
            'facilities' => 'array',
        ];
    }

    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(SpaceImage::class)->orderBy('order');
    }

    public function exhibitions(): HasMany
    {
        return $this->hasMany(Exhibition::class);
    }
}
