<?php

use App\Models\Artist;
use App\Models\Curator;
use App\Models\Gallery;
use App\Models\User;
use App\UserRole;
use Livewire\Livewire;

test('login page is accessible', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('admin user is redirected to admin panel after login', function () {
    $admin = User::factory()->create([
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => UserRole::Admin,
    ]);

    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', 'admin@test.com')
        ->set('password', 'password')
        ->call('login')
        ->assertRedirect('/admin');

    expect(auth()->check())->toBeTrue();
    expect(auth()->user()->id)->toBe($admin->id);
});

test('artist user is redirected to artist panel after login', function () {
    $artist = Artist::factory()->create();

    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', $artist->user->email)
        ->set('password', 'password')
        ->call('login')
        ->assertRedirect('/artist');

    expect(auth()->check())->toBeTrue();
    expect(auth()->user()->id)->toBe($artist->user->id);
});

test('curator user is redirected to curator panel after login', function () {
    $curator = Curator::factory()->create();

    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', $curator->user->email)
        ->set('password', 'password')
        ->call('login')
        ->assertRedirect('/curator');

    expect(auth()->check())->toBeTrue();
    expect(auth()->user()->id)->toBe($curator->user->id);
});

test('gallery user is redirected to gallery panel after login', function () {
    $gallery = Gallery::factory()->create();

    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', $gallery->user->email)
        ->set('password', 'password')
        ->call('login')
        ->assertRedirect('/gallery');

    expect(auth()->check())->toBeTrue();
    expect(auth()->user()->id)->toBe($gallery->user->id);
});

test('login fails with incorrect credentials', function () {
    $artist = Artist::factory()->create();

    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', $artist->user->email)
        ->set('password', 'wrong-password')
        ->call('login')
        ->assertHasErrors(['email']);

    expect(auth()->check())->toBeFalse();
});

test('login requires email', function () {
    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('password', 'password')
        ->call('login')
        ->assertHasErrors(['email']);
});

test('login requires password', function () {
    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', 'test@test.com')
        ->call('login')
        ->assertHasErrors(['password']);
});

test('login remembers user when remember is checked', function () {
    $artist = Artist::factory()->create();

    Livewire::test(\App\Livewire\Auth\Login::class)
        ->set('email', $artist->user->email)
        ->set('password', 'password')
        ->set('remember', true)
        ->call('login')
        ->assertRedirect('/artist');

    expect(auth()->check())->toBeTrue();
    expect(auth()->user()->id)->toBe($artist->user->id);
});

test('panel login pages redirect to central login', function () {
    $this->get('/admin/login')->assertRedirect('/login');
    $this->get('/artist/login')->assertRedirect('/login');
    $this->get('/curator/login')->assertRedirect('/login');
    $this->get('/gallery/login')->assertRedirect('/login');
});
