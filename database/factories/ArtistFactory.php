<?php

namespace Database\Factories;

use App\ArtStyle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artist>
 */
class ArtistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->artist(),
            'specialization' => fake()->randomElement(ArtStyle::cases())->value,
            'location' => fake()->city().', '.fake()->country(),
            'views' => fake()->numberBetween(100, 10000),
            'followers_count' => fake()->numberBetween(50, 5000),
        ];
    }
}
