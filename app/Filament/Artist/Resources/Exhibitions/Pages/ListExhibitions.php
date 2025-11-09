<?php

namespace App\Filament\Artist\Resources\Exhibitions\Pages;

use App\Filament\Artist\Resources\Exhibitions\ExhibitionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListExhibitions extends ListRecords
{
    protected static string $resource = ExhibitionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
