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
            'product_id' => Product::inRandomOrder()->first()->id, // Lấy product_id ngẫu nhiên từ bảng products
            'operating_system' => $this->faker->randomElement(['Android', 'iOS', 'Windows']),
            'chip' => $this->faker->randomElement(['Snapdragon 888', 'Exynos 2100', 'A15 Bionic']),
            'ram' => $this->faker->randomElement(['4GB', '6GB', '8GB', '12GB']),
            'storage' => $this->faker->randomElement(['64GB', '128GB', '256GB']),
            'camera_resolution' => $this->faker->randomElement(['12MP', '48MP', '64MP', '108MP']),
            'battery_capacity' => $this->faker->randomElement(['3000mAh', '4000mAh', '4500mAh']),
            'battery_type' => $this->faker->randomElement(['Li-Po', 'Li-Ion', 'Li-Polymer']),
            'dimensions' => $this->faker->word() . ' x ' . $this->faker->word() . ' x ' . $this->faker->word(),
        ];
    }
}
