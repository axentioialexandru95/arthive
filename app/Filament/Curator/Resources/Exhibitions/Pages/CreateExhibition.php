<?php

namespace App\Filament\Curator\Resources\Exhibitions\Pages;

use App\Filament\Curator\Resources\Exhibitions\ExhibitionResource;
use Filament\Resources\Pages\CreateRecord;

class CreateExhibition extends CreateRecord
{
    protected static string $resource = ExhibitionResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['curator_id'] = auth()->user()->curator->id;

        return $data;
    }
}
