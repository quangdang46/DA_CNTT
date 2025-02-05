<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_code',
        'tracking_url',
        'user_id',
        'guest_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'total_price',
        'status',
        'shipping_status',
        'shipping_partner',
        'shipped_at',
        'delivered_at',
        'returned_at',
        'shipping_fee',
        'estimated_delivery_time',
        'payment_status',
        'payment_method',
        'payment_gateway',
        'transaction_id',
        'order_time',
        'delivery_time',
        'cancel_time',
        'address_id',
        'note',
    ];

    // Relationship: Một đơn hàng có nhiều sản phẩm (order items)
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Relationship: Một đơn hàng thuộc về một địa chỉ
    public function address()
    {
        return $this->belongsTo(UserAddress::class, 'address_id');
    }

    // Relationship: Một đơn hàng có một lịch sử trạng thái
    public function statusHistory()
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

    // Relationship: Một đơn hàng có một thanh toán
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
