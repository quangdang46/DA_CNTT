<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'status',
        'category_id',
        'slug',
        'weight',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function attributes()
    {
        return $this->hasOne(ProductAttribute::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function discounts()
    {
        return $this->hasMany(ProductDiscount::class, 'product_id');
    }
    // Relationship: Một sản phẩm có thể xuất hiện trong nhiều order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

}
