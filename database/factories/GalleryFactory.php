<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gallery>
 */
class GalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->gallery(),
            'name' => fake()->company().' Gallery',
            'description' => fake()->paragraph(4),
            'location' => fake()->city().', '.fake()->country(),
            'rating' => fake()->randomFloat(2, 3.5, 5.0),
            'followers_count' => fake()->numberBetween(200, 10000),
        ];
    }
}
