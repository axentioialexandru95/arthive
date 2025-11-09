<?php

namespace App\Filament\Curator\Pages\Auth;

use App\Models\Curator;
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
                'role' => UserRole::Curator,
            ]);

            Curator::create([
                'user_id' => $user->id,
                'experience' => null,
                'location' => null,
                'exhibitions_count' => 0,
                'followers_count' => 0,
            ]);

            return $user;
        });
    }
}
