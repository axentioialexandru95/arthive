<?php

namespace App\Providers;

use App\Models\Album;
use App\Models\Artwork;
use App\Models\Exhibition;
use App\Models\Space;
use App\Policies\AlbumPolicy;
use App\Policies\ArtworkPolicy;
use App\Policies\ExhibitionPolicy;
use App\Policies\SpacePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     */
    protected $policies = [
        Album::class => AlbumPolicy::class,
        Artwork::class => ArtworkPolicy::class,
        Exhibition::class => ExhibitionPolicy::class,
        Space::class => SpacePolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}
