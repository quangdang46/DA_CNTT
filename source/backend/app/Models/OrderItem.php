<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'rating',
        'name',
    ];

    // Relationship: Một order item thuộc về một đơn hàng
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relationship: Một order item thuộc về một sản phẩm
    public function product()
    {
        return $this->belongsTo(Product::class); // Giả sử bạn có model Product
    }
}
