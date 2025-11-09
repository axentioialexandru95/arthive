<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::with(['user'])
            ->withCount(['spaces'])
            ->paginate(15)
            ->through(fn ($gallery) => [
                'id' => $gallery->id,
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
                'is_followed_by_auth' => false, // Mock for now
            ]);

        return Inertia::render('Galleries/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function show(Gallery $gallery): Response
    {
        $gallery->load([
            'user',
            'spaces.images' => fn ($q) => $q->orderBy('order'),
            'spaces.exhibitions',
        ]);

        $availableSpaces = $gallery->spaces->where('available', true)->count();
        $totalExhibitionsHosted = $gallery->spaces->sum(fn ($space) => $space->exhibitions->count());

        $galleryData = [
            'id' => $gallery->id,
            'name' => $gallery->name,
            'description' => $gallery->description,
            'location' => $gallery->location,
            'rating' => $gallery->rating,
            'followers_count' => $gallery->followers_count,
            'user' => [
                'id' => $gallery->user->id,
                'name' => $gallery->user->name,
                'bio' => $gallery->user->bio,
                'avatar' => $gallery->user->avatar,
            ],
            'spaces' => $gallery->spaces->map(fn ($space) => [
                'id' => $space->id,
                'name' => $space->name,
                'description' => $space->description,
                'size_sqm' => $space->size_sqm,
                'price' => $space->price,
                'available' => $space->available,
                'facilities' => $space->facilities,
                'images' => $space->images->map(fn ($image) => [
                    'id' => $image->id,
                    'image_path' => $image->image_path,
                    'order' => $image->order,
                ]),
                'exhibitions_count' => $space->exhibitions->count(),
            ]),
            'stats' => [
                'total_spaces' => $gallery->spaces->count(),
                'available_spaces' => $availableSpaces,
                'total_exhibitions_hosted' => $totalExhibitionsHosted,
                'rating' => $gallery->rating,
                'followers_count' => $gallery->followers_count,
            ],
            'is_followed_by_auth' => false, // Mock for now
        ];

        return Inertia::render('Galleries/Show', [
            'gallery' => $galleryData,
        ]);
    }
}
