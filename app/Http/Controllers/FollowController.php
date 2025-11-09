<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Curator;
use App\Models\Follow;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'following_id' => 'required|integer',
            'following_type' => 'required|in:artist,curator,gallery',
        ]);

        $followerId = auth()->id();

        // Get the model class
        $followingModel = match ($validated['following_type']) {
            'artist' => Artist::class,
            'curator' => Curator::class,
            'gallery' => Gallery::class,
        };

        // Check if already following
        $exists = Follow::where('follower_id', $followerId)
            ->where('following_id', $validated['following_id'])
            ->where('following_type', $followingModel)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Already following',
                'is_following' => true,
            ]);
        }

        // Create follow
        Follow::create([
            'follower_id' => $followerId,
            'following_id' => $validated['following_id'],
            'following_type' => $followingModel,
        ]);

        // Increment followers_count
        $target = $followingModel::find($validated['following_id']);
        if ($target) {
            $target->increment('followers_count');
        }

        return response()->json([
            'success' => true,
            'is_following' => true,
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'following_id' => 'required|integer',
            'following_type' => 'required|in:artist,curator,gallery',
        ]);

        $followerId = auth()->id();

        // Get the model class
        $followingModel = match ($validated['following_type']) {
            'artist' => Artist::class,
            'curator' => Curator::class,
            'gallery' => Gallery::class,
        };

        // Delete follow
        $deleted = Follow::where('follower_id', $followerId)
            ->where('following_id', $validated['following_id'])
            ->where('following_type', $followingModel)
            ->delete();

        if ($deleted) {
            // Decrement followers_count
            $target = $followingModel::find($validated['following_id']);
            if ($target) {
                $target->decrement('followers_count');
            }
        }

        return response()->json([
            'success' => true,
            'is_following' => false,
        ]);
    }
}
