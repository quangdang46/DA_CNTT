<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Danh sách vai trò hợp lý trong hệ thống
        $roles = [
            'guest' => 'Khách vãng lai',
            'employee' => 'Nhân viên bán hàng',
            'admin' => 'Quản trị viên',
        ];

        // Chọn vai trò ngẫu nhiên
        $roleKey = $this->faker->randomElement(array_keys($roles));

        return [
            'name' => match ($roleKey) {
                'guest' => $this->faker->name(),
                'employee' => "Nhân viên " . $this->faker->lastName(),
                'admin' => "Admin " . $this->faker->lastName(),
                default => $this->faker->name(),
            },
            'email' => Str::lower(Str::slug($this->faker->unique()->safeEmail(), '.')),
            'password' => Hash::make('password123'), // Mật khẩu mặc định
            'phone' => $this->faker->optional()->regexify('09[0-9]{8}'), // 09xxxxxxxx
            'role' => $roleKey, // Lấy từ danh sách vai trò
            'loyalty_points' => $roleKey === 'guest' ? $this->faker->numberBetween(50, 500) : 0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
