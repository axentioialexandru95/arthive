<?php

namespace App\Filament\Gallery\Resources\Spaces\Pages;

use App\Filament\Gallery\Resources\Spaces\SpaceResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSpace extends CreateRecord
{
    protected static string $resource = SpaceResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['gallery_id'] = auth()->user()->gallery->id;

        return $data;
    }
}
