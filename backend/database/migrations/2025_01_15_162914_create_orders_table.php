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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('customer_name')->nullable();
            $table->decimal('total_price', 8, 2);
            $table->enum('status', ['processing', 'delivered', 'canceled']);
            $table->enum('payment_method', ['QR', 'cash']);
            $table->timestamps();
            $table->timestamp('delivery_time')->nullable();
            $table->timestamp('order_time')->nullable();
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
