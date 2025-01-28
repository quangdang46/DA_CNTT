<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    // Quan hệ: Cart thuộc về User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ: Cart có nhiều CartItem
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
