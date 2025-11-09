<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Curator>
 */
class CuratorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->curator(),
            'experience' => fake()->randomElement(['5+ years', '10+ years', '15+ years', '20+ years']),
            'location' => fake()->city().', '.fake()->country(),
            'exhibitions_count' => fake()->numberBetween(5, 50),
            'followers_count' => fake()->numberBetween(100, 8000),
        ];
    }
}
