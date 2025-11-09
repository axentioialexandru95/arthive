<?php

namespace App\Filament\Artist\Widgets;

use App\Models\Artwork;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentArtworks extends TableWidget
{
    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Recent Artworks';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Artwork::query()
                    ->whereHas('album', function (Builder $query) {
                        $query->where('artist_id', auth()->user()?->artist?->id);
                    })
                    ->with(['album'])
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                ImageColumn::make('image_path')
                    ->label('Image')
                    ->circular()
                    ->defaultImageUrl('/api/placeholder/100/100'),

                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('album.title')
                    ->label('Album')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('medium')
                    ->badge()
                    ->formatStateUsing(fn ($state) => str($state->value)->replace('_', ' ')->title())
                    ->color(fn ($state): string => match ($state) {
                        \App\Medium::Oil => 'success',
                        \App\Medium::Acrylic => 'info',
                        \App\Medium::Watercolor => 'primary',
                        \App\Medium::Digital => 'warning',
                        \App\Medium::Sculpture => 'danger',
                        \App\Medium::Photography => 'gray',
                        default => 'gray',
                    }),

                TextColumn::make('year')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Added')
                    ->dateTime()
                    ->sortable()
                    ->since(),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
