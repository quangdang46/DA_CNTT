<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'amount',
        'is_percentage',
        'start_date',
        'end_date',
        'status',
    ];

    // Định nghĩa mối quan hệ với bảng product_discounts
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_discounts')
        ->withPivot('amount', 'start_date', 'end_date', 'status');
    }

    // Định nghĩa mối quan hệ với bảng order_discounts
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_discounts')
        ->withPivot('discount_amount', 'discount_type');
    }
}
