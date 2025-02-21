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
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->enum('payment_method', ['QR', 'cash']);
            $table->decimal('amount', 10, 2);

            // Trạng thái thanh toán
            $table->enum('payment_status', ['success', 'failed', 'pending'])->default('pending');

            // Hoàn tiền
            $table->enum('refund_status', ['none', 'requested', 'processing', 'refunded'])->default('none');
            $table->timestamp('refund_at')->nullable(); // Ngày hoàn tiền


            $table->timestamp('paid_at')->nullable();
            $table->string('payment_gateway')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('customer_phone')->nullable();
            $table->timestamps();
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
