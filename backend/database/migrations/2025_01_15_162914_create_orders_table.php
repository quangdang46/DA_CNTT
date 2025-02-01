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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Cho phép null cho khách vãng lai
            $table->string('session_id')->nullable(); // Lưu session của khách chưa đăng nhập
            $table->string('customer_name')->nullable();
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['processing', 'delivered', 'canceled'])->default('processing');
            $table->enum('payment_method', ['QR', 'cash']);
            $table->timestamps();
            $table->timestamp('order_time')->default(now()); // Mặc định là thời gian hiện tại
            $table->timestamp('delivery_time')->nullable();
            $table->timestamp('cancel_time')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
