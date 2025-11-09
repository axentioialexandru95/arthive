<?php

namespace App\Filament\Curator\Resources\Exhibitions\Pages;

use App\Filament\Curator\Resources\Exhibitions\ExhibitionResource;
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
