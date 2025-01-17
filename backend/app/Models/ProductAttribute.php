<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    use HasFactory;

    protected $table = 'product_attributes';  // Tên bảng trong database

    protected $fillable = [
        'product_id',
        'operating_system',
        'chip',
        'ram',
        'storage',
        'camera_resolution',
        'battery_capacity',
        'battery_type',
        'dimensions',
    ];

    // Quan hệ với bảng products
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
