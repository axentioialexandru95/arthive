<?php

namespace App\Policies;

use App\Models\Album;
use App\Models\User;

class AlbumPolicy
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
    public function view(User $user, Album $album): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isArtist() && $user->artist) {
            return $album->artist_id === $user->artist->id;
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
    public function update(User $user, Album $album): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isArtist() && $user->artist) {
            return $album->artist_id === $user->artist->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Album $album): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isArtist() && $user->artist) {
            return $album->artist_id === $user->artist->id;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Album $album): bool
    {
        return $this->delete($user, $album);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Album $album): bool
    {
        return $user->isAdmin();
    }
}
