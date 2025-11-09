<?php

namespace App\Filament\Artist\Widgets;

use App\Models\Album;
use App\Models\Artwork;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ArtistStatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $artist = auth()->user()?->artist;

        if (! $artist) {
            return [];
        }

        $totalArtworks = Artwork::whereHas('album', function ($query) use ($artist) {
            $query->where('artist_id', $artist->id);
        })->count();

        $totalAlbums = Album::where('artist_id', $artist->id)->count();

        $totalExhibitions = $artist->exhibitions()->count();

        $followersCount = $artist->followers_count;

        return [
            Stat::make('Total Followers', number_format($followersCount))
                ->description('People following your work')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),

            Stat::make('Artworks', number_format($totalArtworks))
                ->description('Across all albums')
                ->descriptionIcon('heroicon-m-photo')
                ->color('primary'),

            Stat::make('Albums', number_format($totalAlbums))
                ->description('Total collections')
                ->descriptionIcon('heroicon-m-folder-open')
                ->color('info'),

            Stat::make('Exhibitions', number_format($totalExhibitions))
                ->description('Total exhibitions')
                ->descriptionIcon('heroicon-m-building-library')
                ->color('warning'),
        ];
    }
}
