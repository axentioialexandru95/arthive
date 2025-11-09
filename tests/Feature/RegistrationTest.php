<?php

use App\Models\User;
use Livewire\Livewire;

test('registration page is accessible', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('user can register as an artist', function () {
    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'artist')
        ->set('name', 'Test Artist')
        ->set('email', 'artist@test.com')
        ->set('password', 'password123')
        ->set('password_confirmation', 'password123')
        ->set('specialization', 'Painter')
        ->set('location', 'New York')
        ->set('bio', 'I am a test artist')
        ->call('register')
        ->assertRedirect('/artist');

    $user = User::where('email', 'artist@test.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role->value)->toBe('artist');
    expect($user->artist)->not->toBeNull();
    expect($user->artist->specialization)->toBe('Painter');
    expect($user->artist->location)->toBe('New York');
});

test('user can register as a curator', function () {
    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'curator')
        ->set('name', 'Test Curator')
        ->set('email', 'curator@test.com')
        ->set('password', 'password123')
        ->set('password_confirmation', 'password123')
        ->set('location', 'Paris')
        ->set('bio', 'I am a test curator')
        ->call('register')
        ->assertRedirect('/curator');

    $user = User::where('email', 'curator@test.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role->value)->toBe('curator');
    expect($user->curator)->not->toBeNull();
    expect($user->curator->location)->toBe('Paris');
});

test('user can register as a gallery owner', function () {
    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'gallery')
        ->set('name', 'Test Owner')
        ->set('email', 'gallery@test.com')
        ->set('password', 'password123')
        ->set('password_confirmation', 'password123')
        ->set('gallery_name', 'Test Gallery')
        ->set('gallery_description', 'A modern art gallery')
        ->set('location', 'London')
        ->set('bio', 'I am a gallery owner')
        ->call('register')
        ->assertRedirect('/gallery');

    $user = User::where('email', 'gallery@test.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role->value)->toBe('gallery');
    expect($user->gallery)->not->toBeNull();
    expect($user->gallery->name)->toBe('Test Gallery');
    expect($user->gallery->description)->toBe('A modern art gallery');
    expect($user->gallery->location)->toBe('London');
});

test('registration requires valid email', function () {
    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'artist')
        ->set('name', 'Test Artist')
        ->set('email', 'invalid-email')
        ->set('password', 'password123')
        ->set('password_confirmation', 'password123')
        ->call('register')
        ->assertHasErrors(['email']);
});

test('registration requires unique email', function () {
    User::factory()->create(['email' => 'existing@test.com']);

    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'artist')
        ->set('name', 'Test Artist')
        ->set('email', 'existing@test.com')
        ->set('password', 'password123')
        ->set('password_confirmation', 'password123')
        ->call('register')
        ->assertHasErrors(['email']);
});

test('registration requires password confirmation', function () {
    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'artist')
        ->set('name', 'Test Artist')
        ->set('email', 'artist@test.com')
        ->set('password', 'password123')
        ->set('password_confirmation', 'different-password')
        ->call('register')
        ->assertHasErrors(['password_confirmation']);
});

test('user is automatically logged in after registration', function () {
    expect(auth()->check())->toBeFalse();

    Livewire::test(\App\Livewire\Auth\Register::class)
        ->set('role', 'artist')
        ->set('name', 'Test Artist')
        ->set('email', 'artist@test.com')
        ->set('password', 'password123')
        ->set('password_confirmation', 'password123')
        ->call('register');

    expect(auth()->check())->toBeTrue();
    expect(auth()->user()->email)->toBe('artist@test.com');
});
