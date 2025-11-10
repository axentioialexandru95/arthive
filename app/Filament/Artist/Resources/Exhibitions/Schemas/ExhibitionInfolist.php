<?php

namespace App\Filament\Artist\Resources\Exhibitions\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ExhibitionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Exhibition Details')
                    ->schema([
                        ImageEntry::make('cover_image')
                            ->columnSpanFull(),
                        TextEntry::make('title'),
                        TextEntry::make('status')
                            ->badge(),
                        TextEntry::make('curator.user.name')
                            ->label('Curator'),
                        TextEntry::make('space.name')
                            ->label('Gallery Space'),
                        TextEntry::make('start_date')
                            ->date(),
                        TextEntry::make('end_date')
                            ->date(),
                        TextEntry::make('description')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }
}
