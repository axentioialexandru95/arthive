<?php

namespace App\Filament\Artist\Widgets;

use App\Models\Artwork;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class ArtworkViewsChart extends ChartWidget
{
    protected ?string $heading = 'Artworks Created (Last 12 Months)';

    protected int|string|array $columnSpan = 1;

    protected function getData(): array
    {
        $artist = auth()->user()?->artist;

        if (! $artist) {
            return [
                'datasets' => [],
                'labels' => [],
            ];
        }

        $data = [];
        $labels = [];

        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $labels[] = $date->format('M Y');

            $count = Artwork::whereHas('album', function ($query) use ($artist) {
                $query->where('artist_id', $artist->id);
            })
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $data[] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Artworks Created',
                    'data' => $data,
                    'borderColor' => '#9333ea',
                    'backgroundColor' => 'rgba(147, 51, 234, 0.1)',
                    'fill' => true,
                    'tension' => 0.3,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
