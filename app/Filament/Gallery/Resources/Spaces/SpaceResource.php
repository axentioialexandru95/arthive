<?php

namespace App\Filament\Gallery\Resources\Spaces;

use App\Filament\Gallery\Resources\Spaces\Pages\CreateSpace;
use App\Filament\Gallery\Resources\Spaces\Pages\EditSpace;
use App\Filament\Gallery\Resources\Spaces\Pages\ListSpaces;
use App\Filament\Gallery\Resources\Spaces\Schemas\SpaceForm;
use App\Filament\Gallery\Resources\Spaces\Tables\SpacesTable;
use App\Models\Space;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class SpaceResource extends Resource
{
    protected static ?string $model = Space::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingStorefront;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('gallery_id', auth()->user()->gallery->id);
    }

    public static function form(Schema $schema): Schema
    {
        return SpaceForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SpacesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSpaces::route('/'),
            'create' => CreateSpace::route('/create'),
            'edit' => EditSpace::route('/{record}/edit'),
        ];
    }
}
