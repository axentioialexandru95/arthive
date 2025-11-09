<?php

namespace App\Filament\Curator\Resources\Exhibitions\Pages;

use App\Filament\Curator\Resources\Exhibitions\ExhibitionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditExhibition extends EditRecord
{
    protected static string $resource = ExhibitionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
