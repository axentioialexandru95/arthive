<?php

namespace App\Filament\Artist\Resources\Exhibitions\Tables;

use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExhibitionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Cover'),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('curator.user.name')
                    ->label('Curator')
                    ->sortable(),
                TextColumn::make('space.name')
                    ->label('Gallery')
                    ->sortable(),
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('end_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
            ]);
    }
}
