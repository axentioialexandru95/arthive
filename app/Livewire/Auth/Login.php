<?php

namespace App\Livewire\Auth;

use App\UserRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Livewire\Attributes\Validate;
use Livewire\Component;

class Login extends Component
{
    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required')]
    public string $password = '';

    public bool $remember = false;

    public function login()
    {
        $this->validate();

        if (! Auth::attempt(['email' => $this->email, 'password' => $this->password], $this->remember)) {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match our records.',
            ]);
        }

        session()->regenerate();

        $user = Auth::user();

        // Redirect based on user role
        $redirectUrl = match ($user->role) {
            UserRole::Admin => '/admin',
            UserRole::Artist => '/artist',
            UserRole::Curator => '/curator',
            UserRole::Gallery => '/gallery',
            default => '/',
        };

        return redirect()->intended($redirectUrl);
    }

    public function render()
    {
        return view('livewire.auth.login');
    }
}
