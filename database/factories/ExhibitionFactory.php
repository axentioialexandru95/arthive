<?php

namespace Database\Factories;

use App\Models\Curator;
use App\Models\Space;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exhibition>
 */
class ExhibitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(fake()->numberBetween(2, 4), true);
        $startDate = fake()->dateTimeBetween('-1 month', '+2 months');
        $endDate = fake()->dateTimeBetween($startDate, $startDate->format('Y-m-d').' +2 months');

        $width = 1600;
        $height = 900;

        return [
            'curator_id' => Curator::factory(),
            'space_id' => Space::factory(),
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1, 999),
            'description' => fake()->paragraphs(3, true),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'cover_image' => 'https://picsum.photos/seed/'.fake()->uuid()."/{$width}/{$height}",
            'status' => fake()->randomElement(['draft', 'published', 'active', 'past']),
            'views' => fake()->numberBetween(100, 15000),
        ];
    }
}
