<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductAttribute>
 */
class ProductAttributeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'operating_system' => $this->faker->randomElement(['Android', 'iOS']),
            'chip' => $this->faker->randomElement([
                'Snapdragon 8 Gen 3',
                'Snapdragon 8 Gen 2',
                'Dimensity 9200',
                'Exynos 2200',
                'A17 Bionic',
                'A16 Bionic'
            ]),
            'ram' => $this->faker->randomElement(['4GB', '6GB', '8GB', '12GB', '16GB']),
            'storage' => $this->faker->randomElement(['64GB', '128GB', '256GB', '512GB', '1TB']),
            'camera_resolution' => $this->faker->randomElement([
                '12MP',
                '48MP',
                '50MP',
                '64MP',
                '108MP',
                '200MP'
            ]),
            'battery_capacity' => $this->faker->randomElement([
                '3000mAh',
                '4000mAh',
                '4500mAh',
                '5000mAh',
                '6000mAh'
            ]),
            'battery_type' => $this->faker->randomElement(['Li-Po', 'Li-Ion']),
            'dimensions' => $this->faker->randomElement([
                '146.7 x 71.5 x 7.4 mm',
                '161.9 x 73.3 x 8.2 mm',
                '164.8 x 77.2 x 8.9 mm',
                '158.2 x 76.7 x 7.9 mm',
                '151.7 x 71.2 x 7.9 mm'
            ]),
        ];
    }
}
