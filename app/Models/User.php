<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\UserRole;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'bio',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    public function artist(): HasOne
    {
        return $this->hasOne(Artist::class);
    }

    public function curator(): HasOne
    {
        return $this->hasOne(Curator::class);
    }

    public function gallery(): HasOne
    {
        return $this->hasOne(Gallery::class);
    }

    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class);
    }

    public function following(): HasMany
    {
        return $this->hasMany(Follow::class, 'follower_id');
    }

    public function followers(): HasMany
    {
        return $this->hasMany(Follow::class, 'following_id');
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return match ($panel->getId()) {
            'admin' => $this->role === UserRole::Admin,
            'artist' => $this->role === UserRole::Artist && $this->artist()->exists(),
            'curator' => $this->role === UserRole::Curator && $this->curator()->exists(),
            'gallery' => $this->role === UserRole::Gallery && $this->gallery()->exists(),
            default => false,
        };
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::Admin;
    }

    public function isArtist(): bool
    {
        return $this->role === UserRole::Artist;
    }

    public function isCurator(): bool
    {
        return $this->role === UserRole::Curator;
    }

    public function isGallery(): bool
    {
        return $this->role === UserRole::Gallery;
    }
}
