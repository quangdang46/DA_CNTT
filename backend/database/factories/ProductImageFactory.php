<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductImage>
 */
class ProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Mảng các đường dẫn ảnh
        $imageUrls = [
            '/static/images/products-test/1/1.jpg',
            '/static/images/products-test/1/1-1.jpg',
            '/static/images/products-test/1/1-2.jpg',
            '/static/images/products-test/1/1-3.jpg',
            '/static/images/products-test/1/1-4.jpg',
            '/static/images/products-test/1/1-5.jpg',
            '/static/images/products-test/1/1-6.jpg',
            '/static/images/products-test/2/2.jpg',
            '/static/images/products-test/3/3.jpg',
            '/static/images/products-test/3/3-1.jpg',
            '/static/images/products-test/3/3-2.jpg',
            '/static/images/products-test/3/3-3.jpg',
        ];

        // Chọn một ảnh ngẫu nhiên từ danh sách
        $selectedImage = $imageUrls[array_rand($imageUrls)];

        return [
            'product_id' => Product::inRandomOrder()->first()->id, // Chọn ngẫu nhiên một sản phẩm
            'image_url' => $selectedImage,  // Lưu đường dẫn ảnh
        ];
    }
}
