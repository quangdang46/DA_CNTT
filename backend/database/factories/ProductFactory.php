<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),  // Tên sản phẩm ngẫu nhiên
            'description' => $this->faker->text(),  // Mô tả sản phẩm ngẫu nhiên
            'price' => $this->faker->randomFloat(2, 10, 1000),  // Giá sản phẩm ngẫu nhiên từ 10 đến 1000
            'status' => $this->faker->randomElement(['available', 'out_of_stock', 'discontinued']),  // Trạng thái sản phẩm
            'rating' => $this->faker->randomFloat(1, 0, 5),  // Đánh giá sản phẩm ngẫu nhiên từ 0 đến 5
            'slug' => $this->faker->slug(),  // Slug cho tên sản phẩm
            'review_count' => $this->faker->numberBetween(0, 100),  // Số lượng đánh giá ngẫu nhiên
            'category_id' => Category::inRandomOrder()->first()->id,  // Lấy category_id ngẫu nhiên từ bảng categories
        ];
    }
}
