<?php

namespace App\Filament\Gallery\Resources\Spaces\Pages;

use App\Filament\Gallery\Resources\Spaces\SpaceResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSpace extends EditRecord
{
    protected static string $resource = SpaceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
