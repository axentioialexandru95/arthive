<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Curator;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function search(Request $request): array
    {
        $query = $request->input('q', '');

        if (empty($query)) {
            return [
                'artists' => [],
                'curators' => [],
                'galleries' => [],
            ];
        }

        $artists = Artist::with('user')
            ->whereHas('user', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('bio', 'like', "%{$query}%");
            })
            ->orWhere('specialization', 'like', "%{$query}%")
            ->orWhere('location', 'like', "%{$query}%")
            ->whereNotNull('specialization')
            ->whereNotNull('location')
            ->where('specialization', '!=', '')
            ->where('location', '!=', '')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($artist) => [
                'id' => $artist->id,
                'type' => 'artist',
                'name' => $artist->user->name,
                'avatar' => $artist->user->avatar,
                'subtitle' => $artist->specialization,
                'location' => $artist->location,
                'followers_count' => $artist->followers_count,
            ]);

        $curators = Curator::with('user')
            ->whereHas('user', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('bio', 'like', "%{$query}%");
            })
            ->orWhere('experience', 'like', "%{$query}%")
            ->orWhere('location', 'like', "%{$query}%")
            ->whereNotNull('location')
            ->where('location', '!=', '')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($curator) => [
                'id' => $curator->id,
                'type' => 'curator',
                'name' => $curator->user->name,
                'avatar' => $curator->user->avatar,
                'subtitle' => $curator->experience ?? 'Curator',
                'location' => $curator->location,
                'followers_count' => $curator->followers_count,
            ]);

        $galleries = Gallery::with('user')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhere('location', 'like', "%{$query}%")
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($gallery) => [
                'id' => $gallery->id,
                'type' => 'gallery',
                'name' => $gallery->name,
                'avatar' => $gallery->user->avatar ?? null,
                'subtitle' => 'Gallery',
                'location' => $gallery->location,
                'followers_count' => $gallery->followers_count,
            ]);

        return [
            'artists' => $artists,
            'curators' => $curators,
            'galleries' => $galleries,
        ];
    }

    public function index(Request $request): Response
    {
        $query = $request->input('q', '');
        $type = $request->input('type', 'all');

        $results = [
            'artists' => collect(),
            'curators' => collect(),
            'galleries' => collect(),
        ];

        if (($type === 'all' || $type === 'artists') && ! empty($query)) {
            $results['artists'] = Artist::with(['user', 'albums'])
                ->whereHas('user', function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                        ->orWhere('bio', 'like', "%{$query}%");
                })
                ->orWhere('specialization', 'like', "%{$query}%")
                ->orWhere('location', 'like', "%{$query}%")
                ->whereNotNull('specialization')
                ->whereNotNull('location')
                ->where('specialization', '!=', '')
                ->where('location', '!=', '')
                ->withCount(['albums', 'exhibitions'])
                ->latest()
                ->paginate(12, ['*'], 'artists_page')
                ->through(fn ($artist) => [
                    'id' => $artist->id,
                    'type' => 'artist',
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
                    'artworks_count' => $artist->albums->sum(fn ($album) => $album->artworks->count()),
                    'is_followed_by_auth' => false,
                ]);
        }

        if (($type === 'all' || $type === 'curators') && ! empty($query)) {
            $results['curators'] = Curator::with('user')
                ->whereHas('user', function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                        ->orWhere('bio', 'like', "%{$query}%");
                })
                ->orWhere('experience', 'like', "%{$query}%")
                ->orWhere('location', 'like', "%{$query}%")
                ->whereNotNull('location')
                ->where('location', '!=', '')
                ->latest()
                ->paginate(12, ['*'], 'curators_page')
                ->through(fn ($curator) => [
                    'id' => $curator->id,
                    'type' => 'curator',
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
                    'is_followed_by_auth' => false,
                ]);
        }

        if (($type === 'all' || $type === 'galleries') && ! empty($query)) {
            $results['galleries'] = Gallery::with(['user', 'spaces'])
                ->where('name', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->orWhere('location', 'like', "%{$query}%")
                ->withCount('spaces')
                ->latest()
                ->paginate(12, ['*'], 'galleries_page')
                ->through(fn ($gallery) => [
                    'id' => $gallery->id,
                    'type' => 'gallery',
                    'name' => $gallery->name,
                    'description' => $gallery->description,
                    'location' => $gallery->location,
                    'rating' => $gallery->rating,
                    'followers_count' => $gallery->followers_count,
                    'user' => [
                        'id' => $gallery->user->id,
                        'name' => $gallery->user->name,
                        'avatar' => $gallery->user->avatar,
                    ],
                    'spaces_count' => $gallery->spaces_count,
                    'is_followed_by_auth' => false,
                ]);
        }

        return Inertia::render('Search/Index', [
            'results' => $results,
            'query' => $query,
            'type' => $type,
        ]);
    }
}
