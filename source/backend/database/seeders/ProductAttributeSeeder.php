<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductAttribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy tất cả sản phẩm từ bảng products
        $products = Product::all();

        // Xóa dữ liệu cũ nếu cần
        ProductAttribute::truncate();

        // Tạo thuộc tính cho từng sản phẩm
        foreach ($products as $product) {
            ProductAttribute::factory()->create([
                'product_id' => $product->id, // Gán product_id cụ thể
            ]);
        }
    }
}
