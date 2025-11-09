<?php

namespace App\Filament\Artist\Widgets;

use App\Models\Follow;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class FollowerGrowthChart extends ChartWidget
{
    protected ?string $heading = 'Follower Growth (Last 12 Months)';

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

            $cumulativeFollowers = Follow::where('following_id', $artist->user_id)
                ->where('following_type', 'Artist')
                ->where('created_at', '<=', $date->endOfMonth())
                ->count();

            $data[] = $cumulativeFollowers;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total Followers',
                    'data' => $data,
                    'borderColor' => '#10b981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
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
