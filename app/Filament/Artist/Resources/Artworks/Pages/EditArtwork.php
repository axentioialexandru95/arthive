<?php

namespace App\Filament\Artist\Resources\Artworks\Pages;

use App\Filament\Artist\Resources\Artworks\ArtworkResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditArtwork extends EditRecord
{
    protected static string $resource = ArtworkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
