<?php

namespace App\Filament\Gallery\Resources\Spaces\Pages;

use App\Filament\Gallery\Resources\Spaces\SpaceResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSpaces extends ListRecords
{
    protected static string $resource = SpaceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
