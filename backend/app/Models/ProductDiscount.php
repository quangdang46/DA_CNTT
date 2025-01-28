<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDiscount extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'discount_id',
        'amount',
        'start_date',
        'end_date',
        'status',
    ];

    // Quan hệ: ProductDiscount thuộc về Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Quan hệ: ProductDiscount thuộc về Discount
    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }
}
