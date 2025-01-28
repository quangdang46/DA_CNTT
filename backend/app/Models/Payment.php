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
        'transaction_id',
    ];

    // Quan hệ: Payment thuộc về Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Quan hệ: Payment có nhiều PaymentLogs
    public function paymentLogs()
    {
        return $this->hasMany(PaymentLog::class);
    }
}
