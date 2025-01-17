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
        $query = $this->model->query();

        // Kiểm tra và áp dụng tìm kiếm theo tên sản phẩm
        if (!empty($params['keyword'])) {
            $query->where('name', 'like', '%' . $params['keyword'] . '%');
        }

        // Kiểm tra và áp dụng lọc theo danh mục
        if (!empty($params['category'])) {
            $query->where('category_id', $params['category']);
        }

        // Kiểm tra và áp dụng lọc theo giá tối thiểu
        if (!empty($params['price_min'])) {
            $query->where('price', '>=', $params['price_min']);
        }

        // Kiểm tra và áp dụng lọc theo giá tối đa
        if (!empty($params['price_max'])) {
            $query->where('price', '<=', $params['price_max']);
        }
        // Eager load các mối quan hệ images và attributes
        $query->with(['images', 'attributes']);
        // Thực thi truy vấn và trả kết quả
        return $query->get();
    }
    public function findById($id)
    {
        return $this->model->with(['attributes', 'images'])->find($id);
    }

    public function getNewProducts()
    {
        return $this->model->with(['attributes', 'images'])
        ->where('created_at', '>=', now()->subDays(30))
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
