<?php

namespace App\Http\Controllers;

use App\Models\Curator;
use Inertia\Inertia;
use Inertia\Response;

class CuratorController extends Controller
{
    public function index(): Response
    {
        $curators = Curator::with(['user'])
            ->withCount('exhibitions')
            ->paginate(15)
            ->through(fn ($curator) => [
                'id' => $curator->id,
                'experience' => $curator->experience,
                'location' => $curator->location,
                'exhibitions_count' => $curator->exhibitions_count,
                'followers_count' => $curator->followers_count,
                'user' => [
                    'id' => $curator->user->id,
                    'name' => $curator->user->name,
                    'bio' => $curator->user->bio,
                    'avatar' => $curator->user->avatar,
                ],
                'is_followed_by_auth' => false, // Mock for now
            ]);

        return Inertia::render('Curators/Index', [
            'curators' => $curators,
        ]);
    }

    public function show(Curator $curator): Response
    {
        $curator->load([
            'user',
            'exhibitions' => function ($query) {
                $query->with(['space.gallery', 'artists'])
                    ->withCount('artists')
                    ->orderBy('start_date', 'desc');
            },
        ]);

        // Calculate total artists worked with (unique across all exhibitions)
        $totalArtistsWorkedWith = $curator->exhibitions
            ->pluck('artists')
            ->flatten()
            ->unique('id')
            ->count();

        $activeExhibitions = $curator->exhibitions->where('status', 'active')->count();
        $pastExhibitions = $curator->exhibitions->where('status', 'completed')->count();

        $curatorData = [
            'id' => $curator->id,
            'experience' => $curator->experience,
            'location' => $curator->location,
            'exhibitions_count' => $curator->exhibitions_count,
            'followers_count' => $curator->followers_count,
            'user' => [
                'id' => $curator->user->id,
                'name' => $curator->user->name,
                'bio' => $curator->user->bio,
                'avatar' => $curator->user->avatar,
            ],
            'exhibitions' => $curator->exhibitions->map(fn ($exhibition) => [
                'id' => $exhibition->id,
                'title' => $exhibition->title,
                'slug' => $exhibition->slug,
                'description' => $exhibition->description,
                'start_date' => $exhibition->start_date,
                'end_date' => $exhibition->end_date,
                'status' => $exhibition->status,
                'cover_image' => $exhibition->cover_image,
                'space' => $exhibition->space ? [
                    'id' => $exhibition->space->id,
                    'name' => $exhibition->space->name,
                    'gallery' => [
                        'name' => $exhibition->space->gallery->name,
                        'location' => $exhibition->space->gallery->location,
                    ],
                ] : null,
                'artists_count' => $exhibition->artists_count,
            ]),
            'stats' => [
                'total_exhibitions' => $curator->exhibitions->count(),
                'active_exhibitions' => $activeExhibitions,
                'past_exhibitions' => $pastExhibitions,
                'followers_count' => $curator->followers_count,
                'total_artists_worked_with' => $totalArtistsWorkedWith,
            ],
            'is_followed_by_auth' => false, // Mock for now
        ];

        return Inertia::render('Curators/Show', [
            'curator' => $curatorData,
        ]);
    }
}
