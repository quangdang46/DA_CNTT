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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();  // Tạo khóa chính id
            $table->foreignId('order_id')->constrained()->onDelete('cascade');  // Liên kết đến bảng orders
            $table->string('payment_method');  // Phương thức thanh toán (QR, tiền mặt)
            $table->decimal('amount', 10, 2);  // Số tiền thanh toán
            $table->enum('payment_status', ['success', 'failed', 'pending']);  // Trạng thái thanh toán
            $table->string('transaction_id')->nullable();  // Mã giao dịch (nếu có)
            $table->timestamps();  // Thời gian tạo và cập nhật thanh toán
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
