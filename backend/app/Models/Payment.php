<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'payment_method',
        'amount',
        'payment_status',
        'failure_reason',
        'refund_status',
        'refund_at',
        'vnpay_data',
        'paid_at',
        'payment_gateway',
        'customer_name',
        'customer_email',
        'customer_phone',
    ];

    // Relationship: Một thanh toán thuộc về một đơn hàng
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
