<?php

namespace App\Filament\Curator\Resources\Exhibitions;

use App\Filament\Curator\Resources\Exhibitions\Pages\CreateExhibition;
use App\Filament\Curator\Resources\Exhibitions\Pages\EditExhibition;
use App\Filament\Curator\Resources\Exhibitions\Pages\ListExhibitions;
use App\Filament\Curator\Resources\Exhibitions\Schemas\ExhibitionForm;
use App\Filament\Curator\Resources\Exhibitions\Tables\ExhibitionsTable;
use App\Models\Exhibition;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ExhibitionResource extends Resource
{
    protected static ?string $model = Exhibition::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendar;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('curator_id', auth()->user()->curator->id);
    }

    public static function form(Schema $schema): Schema
    {
        return ExhibitionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExhibitionsTable::configure($table);
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
            'index' => ListExhibitions::route('/'),
            'create' => CreateExhibition::route('/create'),
            'edit' => EditExhibition::route('/{record}/edit'),
        ];
    }
}
