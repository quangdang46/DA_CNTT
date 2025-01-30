<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function getAllProducts($perPage = null)
    {
        // Nếu không có tham số $perPage, trả về tất cả sản phẩm kèm theo các mối quan hệ
        if (!$perPage) {
            return $this->model->with(['images', 'attributes'])->get();
        }

        // Nếu có tham số $perPage, trả về sản phẩm phân trang kèm theo các mối quan hệ
        return $this->model->with(['images', 'attributes'])->paginate($perPage);
    }

    public function search($params)
    {
        // Khởi tạo truy vấn
        $query = $this->model->query();


        // Eager load các mối quan hệ như images và attributes
        $query->with(['images', 'attributes']);
        // Lọc theo tên sản phẩm
        if (!empty($params['name'])) {
            $query->where('name', 'like', '%' . $params['name'] . '%');
        }

        // Lọc theo danh mục (categories)
        if (!empty($params['categories'])) {
            // Nếu có nhiều danh mục, tìm kiếm theo nhiều giá trị
            $query->whereIn('category_id', $params['categories']);
        }

        // Lọc theo giá tối thiểu (minPrice)
        if (!empty($params['minPrice'])) {
            $query->where('price', '>=', $params['minPrice']);
        }

        // Lọc theo giá tối đa (maxPrice)
        if (!empty($params['maxPrice'])) {
            $query->where('price', '<=', $params['maxPrice']);
        }

        // Sắp xếp theo sortBy
        if (!empty($params['sortBy'])) {
            switch ($params['sortBy']) {
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                case 'date':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'price-asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    // Sắp xếp mặc định (nếu có)
                    break;
            }
        }

        if (!empty($params['perPage']) && $params['perPage'] != -1) {
            return $query->paginate($params['perPage']);
        } elseif (!empty($params['perPage']) && $params['perPage'] == -1) {
            // Nếu perPage là -1, lấy tất cả sản phẩm
            return $query->get();  // Sử dụng get() khi không cần phân trang
        } else {
            // Nếu không có tham số perPage, mặc định lấy 20 sản phẩm
            return $query->paginate(20);
        }



        // Thực thi truy vấn và trả về kết quả
        return $query->get();
    }
    public function findBySlug($slug)
    {
        return $this->model->with(['attributes', 'images', 'category'])
            ->where('slug', $slug)
            ->first();
    }


    public function getProductByType($type = "high-rated")
    {
        switch ($type) {
            case "new":
                return $this->model->with(['attributes', 'images'])
                    ->where('created_at', '>=', now()->subDays(30))
                    ->orderBy('created_at', 'desc')
                    ->get();
                break;

            case "high-rated":
                return $this->model->with(['attributes', 'images'])
                    ->where('rating', '>=', 4) // Rating từ 4 trở lên
                    ->where('review_count', '>=', 10) // Ít nhất 10 đánh giá
                    ->orderBy('rating', 'desc') // Sắp xếp theo rating cao nhất
                    ->get();
                break;
            case "on-sale":
                return $this->model->with(['attributes', 'images'])
                    ->where("status", "available")
                    ->orderBy('price', 'asc')
                    ->take(10)
                    ->get();
                break;
            case "best-seller":
                return $this->model->with(['attributes', 'images'])
                    ->where("status", "available")
                    ->orderBy('review_count', 'desc')
                    ->take(10)
                    ->get();
                break;
        }
        return [];
    }

    public function related($slug)
    {
        // get related products by slug
        return $this->model->with(['attributes', 'images'])
            ->where('category_id', $this->findBySlug($slug)->category_id)
            // ->where('slug', '!=', $slug)
            ->get();
    }
    public function getInArray($ids, $perPage, $page)
    {
        return $this->model->with(['attributes', 'images'])
            ->whereIn('id', $ids)
            ->paginate($perPage, ['*'], 'page', $page);
    }
}
