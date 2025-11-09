<?php

namespace Database\Factories;

use App\Models\Space;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SpaceImage>
 */
class SpaceImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $width = 1200;
        $height = 800;

        return [
            'space_id' => Space::factory(),
            'image_path' => 'https://picsum.photos/seed/'.fake()->uuid()."/{$width}/{$height}",
            'order' => 0,
        ];
    }
}
