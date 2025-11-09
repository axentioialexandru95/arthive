<?php

namespace App\Livewire\Auth;

use App\Models\Artist;
use App\Models\Curator;
use App\Models\Gallery;
use App\Models\User;
use App\UserRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Register extends Component
{
    #[Validate('required|string|max:255')]
    public string $name = '';

    #[Validate('required|email|unique:users,email')]
    public string $email = '';

    #[Validate('required')]
    public string $password = '';

    #[Validate('required|same:password')]
    public string $password_confirmation = '';

    #[Validate('required|in:artist,curator,gallery')]
    public string $role = 'artist';

    #[Validate('nullable|string|max:500')]
    public string $bio = '';

    #[Validate('nullable|string|max:255')]
    public string $specialization = '';

    #[Validate('nullable|string|max:255')]
    public string $location = '';

    #[Validate('nullable|string|max:255')]
    public string $gallery_name = '';

    #[Validate('nullable|string|max:1000')]
    public string $gallery_description = '';

    public function rules()
    {
        return [
            'password' => ['required', Password::defaults()],
        ];
    }

    public function register()
    {
        $this->validate();

        DB::transaction(function () {
            $user = User::create([
                'name' => $this->name,
                'email' => $this->email,
                'password' => Hash::make($this->password),
                'role' => UserRole::from($this->role),
                'bio' => $this->bio,
            ]);

            match ($this->role) {
                'artist' => Artist::create([
                    'user_id' => $user->id,
                    'specialization' => $this->specialization,
                    'location' => $this->location,
                ]),
                'curator' => Curator::create([
                    'user_id' => $user->id,
                    'experience' => '',
                    'location' => $this->location,
                ]),
                'gallery' => Gallery::create([
                    'user_id' => $user->id,
                    'name' => $this->gallery_name ?: $this->name,
                    'description' => $this->gallery_description,
                    'location' => $this->location,
                ]),
            };

            Auth::login($user);
        });

        $redirectUrl = match ($this->role) {
            'artist' => '/artist',
            'curator' => '/curator',
            'gallery' => '/gallery',
        };

        return redirect($redirectUrl);
    }

    public function render()
    {
        return view('livewire.auth.register');
    }
}
