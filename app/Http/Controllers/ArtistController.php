<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Inertia\Inertia;
use Inertia\Response;

class ArtistController extends Controller
{
    public function index(): Response
    {
        $artists = Artist::with(['user', 'albums' => fn ($q) => $q->withCount('artworks')])
            ->withCount(['albums', 'exhibitions'])
            ->paginate(15)
            ->through(fn ($artist) => [
                'id' => $artist->id,
                'specialization' => $artist->specialization,
                'location' => $artist->location,
                'views' => $artist->views,
                'followers_count' => $artist->followers_count,
                'user' => [
                    'id' => $artist->user->id,
                    'name' => $artist->user->name,
                    'bio' => $artist->user->bio,
                    'avatar' => $artist->user->avatar,
                ],
                'albums_count' => $artist->albums_count,
                'exhibitions_count' => $artist->exhibitions_count,
                'artworks_count' => $artist->albums->sum('artworks_count'),
                'is_followed_by_auth' => auth()->check()
                    ? $artist->followers()->where('follower_id', auth()->id())->exists()
                    : null,
            ]);

        return Inertia::render('Artists/Index', [
            'artists' => $artists,
        ]);
    }

    public function show(Artist $artist): Response
    {
        $artist->load([
            'user',
            'albums.artworks',
            'exhibitions' => function ($query) {
                $query->with(['curator.user', 'space.gallery'])
                    ->orderBy('start_date', 'desc');
            },
        ]);

        $artistData = [
            'id' => $artist->id,
            'specialization' => $artist->specialization,
            'location' => $artist->location,
            'views' => $artist->views,
            'followers_count' => $artist->followers_count,
            'user' => [
                'id' => $artist->user->id,
                'name' => $artist->user->name,
                'bio' => $artist->user->bio,
                'avatar' => $artist->user->avatar,
            ],
            'albums' => $artist->albums->map(fn ($album) => [
                'id' => $album->id,
                'title' => $album->title,
                'description' => $album->description,
                'views' => $album->views,
                'artworks' => $album->artworks->map(fn ($artwork) => [
                    'id' => $artwork->id,
                    'title' => $artwork->title,
                    'medium' => $artwork->medium,
                    'year' => $artwork->year,
                    'image_path' => $artwork->image_path,
                    'description' => $artwork->description,
                    'views' => $artwork->views,
                ]),
            ]),
            'exhibitions' => $artist->exhibitions->map(fn ($exhibition) => [
                'id' => $exhibition->id,
                'title' => $exhibition->title,
                'slug' => $exhibition->slug,
                'start_date' => $exhibition->start_date,
                'end_date' => $exhibition->end_date,
                'status' => $exhibition->status,
                'cover_image' => $exhibition->cover_image,
                'curator' => [
                    'id' => $exhibition->curator->id,
                    'user' => [
                        'name' => $exhibition->curator->user->name,
                    ],
                ],
                'space' => $exhibition->space ? [
                    'name' => $exhibition->space->name,
                    'gallery' => [
                        'name' => $exhibition->space->gallery->name,
                        'location' => $exhibition->space->gallery->location,
                    ],
                ] : null,
            ]),
            'stats' => [
                'total_albums' => $artist->albums->count(),
                'total_artworks' => $artist->albums->sum(fn ($album) => $album->artworks->count()),
                'total_exhibitions' => $artist->exhibitions->count(),
                'followers_count' => $artist->followers_count,
            ],
            'is_followed_by_auth' => auth()->check()
                ? $artist->followers()->where('follower_id', auth()->id())->exists()
                : null,
        ];

        return Inertia::render('Artists/Show', [
            'artist' => $artistData,
        ]);
    }

    public function getFeaturedArtists(): array
    {
        return Artist::with(['user', 'albums.artworks' => function ($query) {
            $query->limit(4);
        }])
            ->inRandomOrder()
            ->limit(6)
            ->get()
            ->toArray();
    }
}
