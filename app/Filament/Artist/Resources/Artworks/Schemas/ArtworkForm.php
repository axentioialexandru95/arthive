<?php

namespace App\Filament\Artist\Resources\Artworks\Schemas;

use App\Medium;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ArtworkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('album_id')
                    ->relationship('album', 'title', function ($query) {
                        return $query->where('artist_id', auth()->user()->artist->id);
                    })
                    ->required()
                    ->searchable()
                    ->preload(),
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Select::make('medium')
                    ->options(Medium::class)
                    ->required(),
                TextInput::make('year')
                    ->numeric()
                    ->minValue(1000)
                    ->maxValue(date('Y') + 1),
                FileUpload::make('image_path')
                    ->image()
                    ->required()
                    ->directory('artworks')
                    ->visibility('private'),
                Textarea::make('description')
                    ->rows(3)
                    ->maxLength(65535)
                    ->columnSpanFull(),
            ]);
    }
}
