<?php

namespace App\Filament\Artist\Resources\Artworks\Pages;

use App\Filament\Artist\Resources\Artworks\ArtworkResource;
use Filament\Resources\Pages\CreateRecord;

class CreateArtwork extends CreateRecord
{
    protected static string $resource = ArtworkResource::class;
}
