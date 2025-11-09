<?php

namespace App\Filament\Gallery\Pages\Auth;

use App\Models\Gallery;
use App\Models\User;
use App\UserRole;
use Filament\Auth\Pages\Register as BaseRegister;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Register extends BaseRegister
{
    protected function handleRegistration(array $data): Model
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                ...$data,
                'role' => UserRole::Gallery,
            ]);

            Gallery::create([
                'user_id' => $user->id,
                'name' => $data['name'],
                'description' => null,
                'location' => null,
                'rating' => 0,
                'followers_count' => 0,
            ]);

            return $user;
        });
    }
}
