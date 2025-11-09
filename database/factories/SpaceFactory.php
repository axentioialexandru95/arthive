<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Space>
 */
class SpaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gallery_id' => Gallery::factory(),
            'name' => fake()->randomElement(['Main Hall', 'Gallery A', 'Studio Space', 'Exhibition Room', 'The Loft']),
            'description' => fake()->paragraph(3),
            'size_sqm' => fake()->numberBetween(50, 500),
            'price' => fake()->randomFloat(2, 500, 10000),
            'available' => fake()->boolean(80),
            'facilities' => fake()->randomElements([
                'Professional Lighting',
                'Security System',
                'Climate Control',
                'Parking',
                'Wifi',
                'Sound System',
                'Accessible',
            ], fake()->numberBetween(2, 5)),
        ];
    }
}
