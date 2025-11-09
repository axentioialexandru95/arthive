<?php

namespace App\Filament\Artist\Resources\Artworks;

use App\Filament\Artist\Resources\Artworks\Pages\CreateArtwork;
use App\Filament\Artist\Resources\Artworks\Pages\EditArtwork;
use App\Filament\Artist\Resources\Artworks\Pages\ListArtworks;
use App\Filament\Artist\Resources\Artworks\Schemas\ArtworkForm;
use App\Filament\Artist\Resources\Artworks\Tables\ArtworksTable;
use App\Models\Artwork;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ArtworkResource extends Resource
{
    protected static ?string $model = Artwork::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->whereHas('album', function ($query) {
                $query->where('artist_id', auth()->user()->artist->id);
            });
    }

    public static function form(Schema $schema): Schema
    {
        return ArtworkForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ArtworksTable::configure($table);
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
            'index' => ListArtworks::route('/'),
            'create' => CreateArtwork::route('/create'),
            'edit' => EditArtwork::route('/{record}/edit'),
        ];
    }
}
