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
        'start_date',
        'end_date',
        'status',
    ];

    // Quan hệ: Discount có nhiều ProductDiscount
    public function productDiscounts()
    {
        return $this->hasMany(ProductDiscount::class);
    }

    // Quan hệ: Discount có nhiều OrderDiscount
    public function orderDiscounts()
    {
        return $this->hasMany(OrderDiscount::class);
    }
}
