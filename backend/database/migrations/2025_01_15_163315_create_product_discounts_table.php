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
        Schema::create('product_discounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Đảm bảo nếu sản phẩm bị xóa thì giảm giá cũng xóa
            $table->foreignId('discount_id')->constrained('discounts')->onDelete('cascade'); // Đảm bảo nếu mã giảm giá bị xóa thì quan hệ cũng xóa
            $table->decimal('amount', 10, 2); // Số tiền giảm (hoặc tỷ lệ giảm)
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['active', 'expired', 'inactive'])->default('inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_discounts');
    }
};
