<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
        'updated_at',
    ];

    // Quan hệ: Inventory thuộc về Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
