<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDiscount extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'discount_id',
    ];

    // Quan hệ: OrderDiscount thuộc về Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Quan hệ: OrderDiscount thuộc về Discount
    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
