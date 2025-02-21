<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::all()->each(function ($product) {
            $imageCount = rand(3, 5); // Số ảnh ngẫu nhiên từ 3 đến 5
            for ($i = 0; $i < $imageCount; $i++) {
                ProductImage::factory()->create([
                    'product_id' => $product->id, // Gắn ảnh vào sản phẩm
                ]);
            }
        });
    }
}
