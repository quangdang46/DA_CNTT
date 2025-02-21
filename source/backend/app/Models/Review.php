<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'user_id',
        'product_id',
        'rating',
        'comment',
        'status',
    ];

    // Quan hệ: Review có thể có review cha
    public function parent()
    {
        return $this->belongsTo(Review::class, 'parent_id');
    }

    // Quan hệ: Review có thể có nhiều review con
    public function children()
    {
        return $this->hasMany(Review::class, 'parent_id');
    }

    // Quan hệ: Review thuộc về User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ: Review thuộc về Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
