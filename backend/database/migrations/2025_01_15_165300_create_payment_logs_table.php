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
        Schema::create('payment_logs', function (Blueprint $table) {
            $table->id();  // Tạo khóa chính id
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');  // Liên kết đến bảng payments
            $table->enum('transaction_status', ['success', 'failed', 'processing']);  // Trạng thái giao dịch
            $table->text('transaction_details')->nullable();  // Chi tiết giao dịch (nếu cần)
            $table->timestamps();  // Thời gian ghi nhận lịch sử thanh toán
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_logs');
    }
};
