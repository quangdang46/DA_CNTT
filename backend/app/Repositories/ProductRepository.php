<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class ProductRepository implements ProductRepositoryInterface
{
    public function search($keyword)
    {
        return Product::where('name', 'like', "%$keyword%")->get();
    }

    public function filter($filters)
    {
        $query = Product::query();

        if (isset($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }
        if (isset($filters['price_min'])) {
            $query->where('price', '>=', $filters['price_min']);
        }
        if (isset($filters['price_max'])) {
            $query->where('price', '<=', $filters['price_max']);
        }
        // Thêm các điều kiện lọc khác nếu cần

        return $query->get();
    }

    public function findById($id)
    {
        return Product::findOrFail($id);
    }

    public function getNewProducts()
    {
        return Product::where('created_at', '>=', now()->subDays(30))->get();
    }

    public function getAllProducts()
    {
        return Product::all();
    }
}
