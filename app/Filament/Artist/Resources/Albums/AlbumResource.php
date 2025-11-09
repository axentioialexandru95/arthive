<?php

namespace App\Filament\Artist\Resources\Albums;

use App\Filament\Artist\Resources\Albums\Pages\CreateAlbum;
use App\Filament\Artist\Resources\Albums\Pages\EditAlbum;
use App\Filament\Artist\Resources\Albums\Pages\ListAlbums;
use App\Filament\Artist\Resources\Albums\Schemas\AlbumForm;
use App\Filament\Artist\Resources\Albums\Tables\AlbumsTable;
use App\Models\Album;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class AlbumResource extends Resource
{
    protected static ?string $model = Album::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('artist_id', auth()->user()->artist->id);
    }

    public static function form(Schema $schema): Schema
    {
        return AlbumForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AlbumsTable::configure($table);
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
            'index' => ListAlbums::route('/'),
            'create' => CreateAlbum::route('/create'),
            'edit' => EditAlbum::route('/{record}/edit'),
        ];
    }
}
