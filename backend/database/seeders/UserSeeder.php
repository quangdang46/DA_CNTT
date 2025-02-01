<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Thêm dữ liệu mẫu vào bảng users
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin@example.com'), // Mật khẩu mặc định là "password"
                'phone' => '0123456789',
                'role' => 'admin',
                'loyalty_points' => 100,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Employee User',
                'email' => 'employee@example.com',
                'password' => Hash::make('employee@example.com'),
                'phone' => '0987654321',
                'role' => 'employee',
                'loyalty_points' => 50,
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Guest User',
                'email' => 'guest@example.com',
                'password' => Hash::make('guest@example.com'),
                'phone' => null,
                'role' => 'guest',
                'loyalty_points' => 0,
                'email_verified_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tran Quang Dang',
                'email' => 'tranquangdang21@gmail.com',
                'password' => Hash::make('tranquangdang21@gmail.com'),
                'phone' => '0123456789',
                'role' => 'guest',
                'loyalty_points' => 100,
                'email_verified_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]

        ]);
    }
}
