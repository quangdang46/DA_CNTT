<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Smartphones',
            'Android Phones',
            'iPhones',
            'Gaming Phones',
            'Budget Phones',
            'Flagship Phones',
            'Foldable Phones',
            '5G Phones',
            'Phone Accessories',
            'Wireless Earbuds',
            'Phone Cases',
            'Power Banks',
            'Screen Protectors',
            'Chargers & Cables',
            'Smartwatches',
            'Tablets',
            'Refurbished Phones',
            'Second-hand Phones',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($categories),
        ];
    }
}
