<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDiscount extends Model
{
    use HasFactory;


    // Các trường có thể gán hàng loạt (mass assignment)
    protected $fillable = [
        'product_id',
        'discount_id',
        'amount',
        'start_date',
        'end_date',
        'status',
    ];

    // Định nghĩa mối quan hệ với model Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    // Định nghĩa mối quan hệ với model Discount
    public function discount()
    {
        return $this->belongsTo(Discount::class, 'discount_id');
    }
}
