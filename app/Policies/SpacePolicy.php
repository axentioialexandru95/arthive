<?php

namespace App\Policies;

use App\Models\Space;
use App\Models\User;

class SpacePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isGallery();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Space $space): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isGallery() && $user->gallery) {
            return $space->gallery_id === $user->gallery->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isGallery() && $user->gallery()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Space $space): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isGallery() && $user->gallery) {
            return $space->gallery_id === $user->gallery->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Space $space): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isGallery() && $user->gallery) {
            return $space->gallery_id === $user->gallery->id;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Space $space): bool
    {
        return $this->delete($user, $space);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Space $space): bool
    {
        return $user->isAdmin();
    }
}
