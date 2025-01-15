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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();  // Tạo khóa chính id
            $table->string('code');  // Mã giảm giá
            $table->decimal('amount', 8, 2);  // Số tiền hoặc tỷ lệ giảm giá
            $table->date('start_date');  // Ngày bắt đầu giảm giá
            $table->date('end_date');  // Ngày kết thúc giảm giá
            $table->enum('status', ['active', 'expired', 'inactive']);  // Trạng thái giảm giá
            $table->timestamps();  // Thêm thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
