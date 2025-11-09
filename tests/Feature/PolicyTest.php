<?php

use App\Models\Album;
use App\Models\Artist;
use App\Models\Artwork;
use App\Models\Curator;
use App\Models\Exhibition;
use App\Models\Gallery;
use App\Models\Space;
use App\Models\User;
use App\UserRole;

test('artist can view their own albums', function () {
    $artist = Artist::factory()->create();
    $album = Album::factory()->create(['artist_id' => $artist->id]);

    expect($artist->user->can('view', $album))->toBeTrue();
});

test('artist cannot view other artists albums', function () {
    $artist1 = Artist::factory()->create();
    $artist2 = Artist::factory()->create();
    $album = Album::factory()->create(['artist_id' => $artist2->id]);

    expect($artist1->user->can('view', $album))->toBeFalse();
});

test('admin can view any album', function () {
    $admin = User::factory()->create(['role' => UserRole::Admin]);
    $artist = Artist::factory()->create();
    $album = Album::factory()->create(['artist_id' => $artist->id]);

    expect($admin->can('view', $album))->toBeTrue();
});

test('artist can update their own artworks', function () {
    $artist = Artist::factory()->create();
    $album = Album::factory()->create(['artist_id' => $artist->id]);
    $artwork = Artwork::factory()->create(['album_id' => $album->id]);

    expect($artist->user->can('update', $artwork))->toBeTrue();
});

test('artist cannot update other artists artworks', function () {
    $artist1 = Artist::factory()->create();
    $artist2 = Artist::factory()->create();
    $album = Album::factory()->create(['artist_id' => $artist2->id]);
    $artwork = Artwork::factory()->create(['album_id' => $album->id]);

    expect($artist1->user->can('update', $artwork))->toBeFalse();
});

test('curator can update their own exhibitions', function () {
    $curator = Curator::factory()->create();
    $space = Space::factory()->create();
    $exhibition = Exhibition::factory()->create([
        'curator_id' => $curator->id,
        'space_id' => $space->id,
    ]);

    expect($curator->user->can('update', $exhibition))->toBeTrue();
});

test('curator cannot update other curators exhibitions', function () {
    $curator1 = Curator::factory()->create();
    $curator2 = Curator::factory()->create();
    $space = Space::factory()->create();
    $exhibition = Exhibition::factory()->create([
        'curator_id' => $curator2->id,
        'space_id' => $space->id,
    ]);

    expect($curator1->user->can('update', $exhibition))->toBeFalse();
});

test('artist can view exhibitions they are part of', function () {
    $artist = Artist::factory()->create();
    $curator = Curator::factory()->create();
    $space = Space::factory()->create();
    $exhibition = Exhibition::factory()->create([
        'curator_id' => $curator->id,
        'space_id' => $space->id,
    ]);
    $exhibition->artists()->attach($artist->id);

    expect($artist->user->can('view', $exhibition))->toBeTrue();
});

test('artist cannot view exhibitions they are not part of', function () {
    $artist = Artist::factory()->create();
    $curator = Curator::factory()->create();
    $space = Space::factory()->create();
    $exhibition = Exhibition::factory()->create([
        'curator_id' => $curator->id,
        'space_id' => $space->id,
    ]);

    expect($artist->user->can('view', $exhibition))->toBeFalse();
});

test('gallery can update their own spaces', function () {
    $gallery = Gallery::factory()->create();
    $space = Space::factory()->create(['gallery_id' => $gallery->id]);

    expect($gallery->user->can('update', $space))->toBeTrue();
});

test('gallery cannot update other galleries spaces', function () {
    $gallery1 = Gallery::factory()->create();
    $gallery2 = Gallery::factory()->create();
    $space = Space::factory()->create(['gallery_id' => $gallery2->id]);

    expect($gallery1->user->can('update', $space))->toBeFalse();
});

test('admin can update any resource', function () {
    $admin = User::factory()->create(['role' => UserRole::Admin]);
    $artist = Artist::factory()->create();
    $album = Album::factory()->create(['artist_id' => $artist->id]);
    $artwork = Artwork::factory()->create(['album_id' => $album->id]);
    $gallery = Gallery::factory()->create();
    $space = Space::factory()->create(['gallery_id' => $gallery->id]);
    $curator = Curator::factory()->create();
    $exhibition = Exhibition::factory()->create([
        'curator_id' => $curator->id,
        'space_id' => $space->id,
    ]);

    expect($admin->can('update', $album))->toBeTrue();
    expect($admin->can('update', $artwork))->toBeTrue();
    expect($admin->can('update', $space))->toBeTrue();
    expect($admin->can('update', $exhibition))->toBeTrue();
});
