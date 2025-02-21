<?php

namespace Database\Seeders;

use App\Models\User;
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
        // Danh sách user cố định
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin@example.com'),
                'phone' => '0123456789',
                'role' => 'admin',
                'loyalty_points' => 100,
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
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pham Ngoc Linh',
                'email' => 'phamngoclinh21@gmail.com',
                'password' => Hash::make('phamngoclinh21@gmail.com'),
                'phone' => '0123456789',
                'role' => 'guest',
                'loyalty_points' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Thêm user cố định vào database
        DB::table('users')->insert($users);

        // Tạo thêm 10 user ngẫu nhiên bằng factory
        User::factory(20)->create();
    }
}
