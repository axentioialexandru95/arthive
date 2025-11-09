<?php

namespace Database\Factories;

use App\Medium;
use App\Models\Album;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artwork>
 */
class ArtworkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $width = fake()->numberBetween(400, 800);
        $height = fake()->numberBetween(400, 800);

        return [
            'album_id' => Album::factory(),
            'title' => fake()->words(fake()->numberBetween(2, 5), true),
            'medium' => fake()->randomElement(Medium::cases())->value,
            'year' => fake()->numberBetween(2015, 2025),
            'image_path' => 'https://picsum.photos/seed/'.fake()->uuid()."/{$width}/{$height}",
            'description' => fake()->optional()->paragraph(2),
            'views' => fake()->numberBetween(10, 2000),
        ];
    }
}
