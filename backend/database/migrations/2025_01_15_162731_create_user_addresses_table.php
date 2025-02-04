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
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade'); // Người dùng đã đăng nhập
            $table->string('guest_id')->nullable();
            // address ward district province
            $table->string('ward_code');
            $table->string('district_code');
            $table->string('province_code');
            $table->string('address');
            $table->boolean('is_default')->default(false);
            $table->timestamps();

            $table->foreign('ward_code')->references('code')->on('wards')->onDelete('cascade');
            $table->foreign('district_code')->references('code')->on('districts')->onDelete('cascade');
            $table->foreign('province_code')->references('code')->on('provinces')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
