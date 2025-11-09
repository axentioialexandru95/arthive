<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\CuratorController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (ArtistController $artistController) {
    return Inertia::render('welcome', [
        'artists' => $artistController->getFeaturedArtists(),
    ]);
})->name('home');

// Panel Selector
Route::get('/auth', \App\Livewire\Auth\PanelSelector::class)->name('auth.select');

// Search
Route::get('/search', [SearchController::class, 'index'])->name('search.index');
Route::get('/api/search', [SearchController::class, 'search'])->name('search.api');

// Artists
Route::get('/artists', [ArtistController::class, 'index'])->name('artists.index');
Route::get('/artists/{artist}', [ArtistController::class, 'show'])->name('artists.show');

// Curators
Route::get('/curators', [CuratorController::class, 'index'])->name('curators.index');
Route::get('/curators/{curator}', [CuratorController::class, 'show'])->name('curators.show');

// Galleries
Route::get('/galleries', [GalleryController::class, 'index'])->name('galleries.index');
Route::get('/galleries/{gallery}', [GalleryController::class, 'show'])->name('galleries.show');

// Follow system (mock - no auth required)
Route::post('/follow', [FollowController::class, 'store'])->name('follow.store');
Route::delete('/follow', [FollowController::class, 'destroy'])->name('follow.destroy');
