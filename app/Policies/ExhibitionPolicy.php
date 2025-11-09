<?php

namespace App\Policies;

use App\Models\Exhibition;
use App\Models\User;

class ExhibitionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isCurator() || $user->isArtist();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Exhibition $exhibition): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isCurator() && $user->curator) {
            return $exhibition->curator_id === $user->curator->id;
        }

        if ($user->isArtist() && $user->artist) {
            return $exhibition->artists()->where('artist_id', $user->artist->id)->exists();
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isCurator() && $user->curator()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Exhibition $exhibition): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isCurator() && $user->curator) {
            return $exhibition->curator_id === $user->curator->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Exhibition $exhibition): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isCurator() && $user->curator) {
            return $exhibition->curator_id === $user->curator->id;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Exhibition $exhibition): bool
    {
        return $this->delete($user, $exhibition);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Exhibition $exhibition): bool
    {
        return $user->isAdmin();
    }
}
