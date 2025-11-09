<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Album;
use App\Models\Artist;
use App\Models\Artwork;
use App\Models\Curator;
use App\Models\Exhibition;
use App\Models\Follow;
use App\Models\Gallery;
use App\Models\Space;
use App\Models\SpaceImage;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@arthive.test',
            'role' => \App\UserRole::Admin,
        ]);

        // Create 6 Artists with albums and artworks
        $artists = Artist::factory(6)->create()->each(function ($artist) {
            // Each artist has 1 album with 5 artworks
            $album = Album::factory()->create([
                'artist_id' => $artist->id,
            ]);

            Artwork::factory(5)->create([
                'album_id' => $album->id,
            ]);
        });

        // Create 4 Curators
        $curators = Curator::factory(4)->create();

        // Create 3 Galleries with 2 spaces each
        $galleries = Gallery::factory(3)->create()->each(function ($gallery) {
            // Each gallery has 2 spaces
            Space::factory(2)->create([
                'gallery_id' => $gallery->id,
            ])->each(function ($space) {
                // Each space has 3-5 images
                SpaceImage::factory(rand(3, 5))->create([
                    'space_id' => $space->id,
                ])->each(function ($image, $index) {
                    $image->update(['order' => $index]);
                });
            });
        });

        // Create 5 Exhibitions (2-3 past, 1-2 active, 1 future)
        $spaces = Space::all();
        $exhibitions = collect();

        // Past exhibitions
        Exhibition::factory(2)->create([
            'curator_id' => $curators->random()->id,
            'space_id' => $spaces->random()->id,
            'status' => 'past',
            'start_date' => now()->subMonths(3),
            'end_date' => now()->subMonths(1),
        ])->each(function ($exhibition) use ($artists, &$exhibitions) {
            // Attach 2-3 artists to each exhibition
            $selectedArtists = $artists->random(rand(2, 3));
            $exhibition->artists()->attach($selectedArtists->pluck('id'));

            // Attach 3-5 artworks from those artists
            $artworks = Artwork::whereIn('album_id', function ($query) use ($selectedArtists) {
                $query->select('id')
                    ->from('albums')
                    ->whereIn('artist_id', $selectedArtists->pluck('id'));
            })->inRandomOrder()->limit(rand(3, 5))->get();

            $exhibition->artworks()->attach($artworks->pluck('id'));
            $exhibitions->push($exhibition);
        });

        // Active exhibitions
        Exhibition::factory(2)->create([
            'curator_id' => $curators->random()->id,
            'space_id' => $spaces->random()->id,
            'status' => 'active',
            'start_date' => now()->subDays(10),
            'end_date' => now()->addDays(20),
        ])->each(function ($exhibition) use ($artists, &$exhibitions) {
            $selectedArtists = $artists->random(rand(2, 3));
            $exhibition->artists()->attach($selectedArtists->pluck('id'));

            $artworks = Artwork::whereIn('album_id', function ($query) use ($selectedArtists) {
                $query->select('id')
                    ->from('albums')
                    ->whereIn('artist_id', $selectedArtists->pluck('id'));
            })->inRandomOrder()->limit(rand(3, 5))->get();

            $exhibition->artworks()->attach($artworks->pluck('id'));
            $exhibitions->push($exhibition);
        });

        // Future exhibition
        Exhibition::factory(1)->create([
            'curator_id' => $curators->random()->id,
            'space_id' => $spaces->random()->id,
            'status' => 'published',
            'start_date' => now()->addDays(15),
            'end_date' => now()->addMonths(2),
        ])->each(function ($exhibition) use ($artists, &$exhibitions) {
            $selectedArtists = $artists->random(rand(2, 3));
            $exhibition->artists()->attach($selectedArtists->pluck('id'));

            $artworks = Artwork::whereIn('album_id', function ($query) use ($selectedArtists) {
                $query->select('id')
                    ->from('albums')
                    ->whereIn('artist_id', $selectedArtists->pluck('id'));
            })->inRandomOrder()->limit(rand(3, 5))->get();

            $exhibition->artworks()->attach($artworks->pluck('id'));
            $exhibitions->push($exhibition);
        });

        // Create Activities
        $allUsers = User::all();

        // Album created activities
        Album::all()->each(function ($album) {
            Activity::factory()->create([
                'user_id' => $album->artist->user_id,
                'type' => 'album_created',
                'data' => [
                    'album_id' => $album->id,
                    'title' => $album->title,
                ],
            ]);
        });

        // Space listed activities
        Space::all()->take(3)->each(function ($space) {
            Activity::factory()->create([
                'user_id' => $space->gallery->user_id,
                'type' => 'space_listed',
                'data' => [
                    'space_id' => $space->id,
                    'name' => $space->name,
                ],
            ]);
        });

        // Exhibition announced activities
        $exhibitions->each(function ($exhibition) {
            Activity::factory()->create([
                'user_id' => $exhibition->curator->user_id,
                'type' => 'exhibition_announced',
                'data' => [
                    'exhibition_id' => $exhibition->id,
                    'title' => $exhibition->title,
                ],
            ]);
        });

        // Create Follow relationships
        // Artists follow curators
        $artists->each(function ($artist) use ($curators) {
            Follow::factory()->create([
                'follower_id' => $artist->user_id,
                'following_id' => $curators->random()->user_id,
                'following_type' => 'curator',
            ]);
        });

        // Curators follow artists and galleries
        $curators->each(function ($curator) use ($artists, $galleries) {
            // Follow 2-3 artists
            $artists->random(rand(2, 3))->each(function ($artist) use ($curator) {
                Follow::factory()->create([
                    'follower_id' => $curator->user_id,
                    'following_id' => $artist->user_id,
                    'following_type' => 'artist',
                ]);
            });

            // Follow 1-2 galleries
            $galleries->random(rand(1, 2))->each(function ($gallery) use ($curator) {
                Follow::factory()->create([
                    'follower_id' => $curator->user_id,
                    'following_id' => $gallery->user_id,
                    'following_type' => 'gallery',
                ]);
            });
        });

        // Create regular users who follow artists, curators, and galleries
        User::factory(5)->create()->each(function ($user) use ($artists, $curators) {
            // Follow 2-3 artists
            $artists->random(rand(2, 3))->each(function ($artist) use ($user) {
                Follow::factory()->create([
                    'follower_id' => $user->id,
                    'following_id' => $artist->user_id,
                    'following_type' => 'artist',
                ]);
            });

            // Follow 1-2 curators
            $curators->random(rand(1, 2))->each(function ($curator) use ($user) {
                Follow::factory()->create([
                    'follower_id' => $user->id,
                    'following_id' => $curator->user_id,
                    'following_type' => 'curator',
                ]);
            });
        });

        $this->command->info('Database seeded successfully!');
        $this->command->info('Created:');
        $this->command->info('- 1 Admin user (admin@arthive.test / password)');
        $this->command->info('- 6 Artists with 1 album each (5 artworks per album)');
        $this->command->info('- 4 Curators');
        $this->command->info('- 3 Galleries with 2 spaces each (3-5 images per space)');
        $this->command->info('- 5 Exhibitions (2 past, 2 active, 1 future)');
        $this->command->info('- Activities for albums, spaces, and exhibitions');
        $this->command->info('- Follow relationships between users');
        $this->command->info('- 5 Regular users');
        $this->command->info('');
        $this->command->info('Login credentials:');
        $this->command->info('Admin: admin@arthive.test / password');
        $this->command->info('Artists: See user emails in database');
        $this->command->info('Curators: See user emails in database');
        $this->command->info('Galleries: See user emails in database');
    }
}
