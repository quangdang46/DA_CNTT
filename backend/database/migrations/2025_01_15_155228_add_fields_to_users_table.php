<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Thêm các cột mới vào bảng users
            $table->string('phone')->nullable(); // Số điện thoại
            $table->enum('role', ['guest', 'employee', 'admin'])->default('guest'); // Vai trò
            $table->integer('loyalty_points')->default(0); // Điểm tích lũy
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Xóa các cột khi rollback migration
            $table->dropColumn(['phone', 'role', 'loyalty_points']);
        });
    }
};
