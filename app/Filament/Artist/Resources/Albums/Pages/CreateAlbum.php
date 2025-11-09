<?php

namespace App\Filament\Artist\Resources\Albums\Pages;

use App\Filament\Artist\Resources\Albums\AlbumResource;
use Filament\Resources\Pages\CreateRecord;

class CreateAlbum extends CreateRecord
{
    protected static string $resource = AlbumResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['artist_id'] = auth()->user()->artist->id;

        return $data;
    }
}
