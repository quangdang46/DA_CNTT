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
            $table->string('tracking_code')->nullable(); // Mã tracking vận chuyển
            $table->string('tracking_url')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Hỗ trợ khách vãng lai
            $table->string('guest_id')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('customer_phone')->nullable();
            $table->decimal('total_price', 10, 2);

            // Trạng thái đơn hàng chính
            $table->enum('status', ['processing', 'delivered', 'canceled'])->default('processing');

            // Trạng thái giao hàng (chi tiết hơn)
            $table->enum('shipping_status', ['pending', 'shipped', 'in_transit', 'delivered', 'returned', 'canceled'])
                ->default('pending');
            $table->string('shipping_partner')->nullable(); // Đơn vị vận chuyển (GHN, GHTK...)
            $table->timestamp('shipped_at')->nullable(); // Ngày đơn hàng được giao cho shipper
            $table->timestamp('delivered_at')->nullable(); // Ngày giao thành công
            $table->timestamp('returned_at')->nullable(); // Ngày hàng bị trả lại
            $table->decimal('shipping_fee', 10, 2)->nullable();
            $table->timestamp('estimated_deliver_time')->nullable();

            // Trạng thái thanh toán
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->enum('payment_method', ['QR', 'cash']);
            $table->string('payment_gateway')->nullable();
            $table->string('transaction_id', 50)->nullable();

            $table->timestamps();
            $table->timestamp('order_time')->default(now()); // Mặc định là thời gian hiện tại
            $table->timestamp('delivery_time')->nullable();
            $table->timestamp('cancel_time')->nullable();
            $table->foreignId('address_id')->nullable()->constrained('user_addresses')->onDelete('set null');
            $table->text('note')->nullable();
        });

        Schema::create('order_status_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['processing', 'shipped', 'in_transit', 'delivered', 'returned', 'canceled']);
            $table->timestamp('changed_at')->useCurrent();
            $table->string('note')->nullable(); // Ghi chú lý do cập nhật
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_status_history');
    }
};
