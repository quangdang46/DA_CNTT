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
        // Danh sách các mẫu điện thoại phổ biến
        $phoneNames = [
            'iPhone 15 Pro',
            'iPhone 15 Pro Max',
            'iPhone 14',
            'iPhone 14 Pro Max',
            'Samsung Galaxy S24 Ultra',
            'Samsung Galaxy Z Flip 5',
            'Samsung Galaxy A54',
            'Xiaomi 13 Pro',
            'Redmi Note 12',
            'Realme GT Neo 5',
            'Oppo Find X6 Pro',
            'Vivo X90 Pro',
            'OnePlus 11',
            'Asus ROG Phone 7',
            'Google Pixel 8 Pro'
        ];

        // Danh sách mô tả ý nghĩa
        $descriptions = [
            "Chiếc điện thoại mạnh mẽ với vi xử lý tiên tiến, mang lại hiệu suất mượt mà cho mọi tác vụ. Thiết kế sang trọng, màn hình sắc nét và thời lượng pin ấn tượng.",
            "Điện thoại sở hữu camera chất lượng cao, chụp ảnh sắc nét ngay cả trong điều kiện thiếu sáng. Màn hình hiển thị rực rỡ, giúp bạn tận hưởng nội dung một cách sống động.",
            "Một chiếc smartphone hoàn hảo dành cho game thủ với chip xử lý mạnh mẽ, màn hình tần số quét cao và hệ thống tản nhiệt hiệu quả.",
            "Sản phẩm tích hợp công nghệ AI hiện đại, giúp tối ưu hóa trải nghiệm người dùng. Hệ thống loa âm thanh vòm mang đến âm thanh chân thực khi xem phim, nghe nhạc.",
            "Smartphone mỏng nhẹ, thiết kế tinh tế cùng hiệu năng mạnh mẽ, phù hợp cho công việc và giải trí. Camera đa chức năng giúp bạn ghi lại mọi khoảnh khắc tuyệt vời.",
            "Chiếc điện thoại có dung lượng pin lớn, hỗ trợ sạc nhanh giúp bạn luôn sẵn sàng trong mọi tình huống. Kết nối 5G tốc độ cao mang đến trải nghiệm internet mượt mà."
        ];

        return [
            'name' => $this->faker->randomElement($phoneNames), // Chọn tên từ danh sách có sẵn
            'description' => $this->faker->randomElement($descriptions),  // Mô tả dài, có ý nghĩa
            'price' => $this->faker->numberBetween(1000000, 7000000), // Giá từ 1 triệu - 15 triệu
            'status' => $this->faker->randomElement(['available', 'out_of_stock', 'discontinued']),
            'rating' => $this->faker->randomFloat(1, 3, 5),  // Giới hạn từ 3 - 5 sao
            'slug' => $this->faker->slug(),  // Slug tự động
            'weight' => $this->faker->randomFloat(2, 0.1, 0.2), // Trọng lượng hợp lý từ 120g - 250g
            'review_count' => $this->faker->numberBetween(10, 5000),  // Số đánh giá
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory()->create()->id,
        ];
    }
}
