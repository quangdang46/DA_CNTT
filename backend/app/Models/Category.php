<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Bảng này không sử dụng timestamps mặc định (created_at và updated_at),
    // nếu không cần sử dụng, có thể bỏ qua hoặc để tùy chỉnh
    public $timestamps = true;

    // Các thuộc tính có thể gán giá trị hàng loạt
    protected $fillable = [
        'name',
    ];

    // Các thuộc tính cần cast (kiểu dữ liệu)
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Quan hệ với bảng products
    public function products()
    {
        return $this->hasMany(Product::class); // Một danh mục có nhiều sản phẩm
    }
}
