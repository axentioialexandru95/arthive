<?php

namespace App\Filament\Artist\Pages\Auth;

use App\Models\Artist;
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
                'role' => UserRole::Artist,
            ]);

            Artist::create([
                'user_id' => $user->id,
                'specialization' => null,
                'location' => null,
                'views' => 0,
                'followers_count' => 0,
            ]);

            return $user;
        });
    }
}
