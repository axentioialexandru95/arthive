<?php

namespace App\Filament\Artist\Resources\Exhibitions;

use App\Filament\Artist\Resources\Exhibitions\Pages\ListExhibitions;
use App\Filament\Artist\Resources\Exhibitions\Pages\ViewExhibition;
use App\Filament\Artist\Resources\Exhibitions\Schemas\ExhibitionInfolist;
use App\Filament\Artist\Resources\Exhibitions\Tables\ExhibitionsTable;
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
            ->whereHas('artists', function ($query) {
                $query->where('artist_id', auth()->user()->artist->id);
            });
    }

    public static function infolist(Schema $schema): Schema
    {
        return ExhibitionInfolist::configure($schema);
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
            'view' => ViewExhibition::route('/{record}'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }
}
