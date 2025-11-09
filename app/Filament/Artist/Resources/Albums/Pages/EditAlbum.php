<?php

namespace App\Filament\Artist\Resources\Albums\Pages;

use App\Filament\Artist\Resources\Albums\AlbumResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAlbum extends EditRecord
{
    protected static string $resource = AlbumResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
