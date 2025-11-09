<?php

namespace App\Policies;

use App\Models\Artwork;
use App\Models\User;

class ArtworkPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isArtist();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Artwork $artwork): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isArtist() && $user->artist) {
            return $artwork->album->artist_id === $user->artist->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isArtist() && $user->artist()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Artwork $artwork): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isArtist() && $user->artist) {
            return $artwork->album->artist_id === $user->artist->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Artwork $artwork): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isArtist() && $user->artist) {
            return $artwork->album->artist_id === $user->artist->id;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Artwork $artwork): bool
    {
        return $this->delete($user, $artwork);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Artwork $artwork): bool
    {
        return $user->isAdmin();
    }
}
