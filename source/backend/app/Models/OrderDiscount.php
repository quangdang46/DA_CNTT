<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDiscount extends Model
{
    use HasFactory;

    // Các trường có thể gán hàng loạt (mass assignment)
    protected $fillable = [
        'order_id',
        'discount_id',
        'discount_amount',
        'discount_type',
    ];

    // Định nghĩa mối quan hệ với model Order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    // Định nghĩa mối quan hệ với model Discount
    public function discount()
    {
        return $this->belongsTo(Discount::class, 'discount_id');
    }
}
