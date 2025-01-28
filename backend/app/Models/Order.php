<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_name',
        'total_price',
        'status',
        'payment_method',
        'delivery_time',
        'order_time',
        'cancel_time',
    ];

    // Quan hệ: Order thuộc về User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ: Order có nhiều OrderItem
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
