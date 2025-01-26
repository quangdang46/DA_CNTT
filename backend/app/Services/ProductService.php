<?php

namespace App\Services;

use App\Repositories\Interfaces\ProductRepositoryInterface;

class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts($perPage = 1)
    {
        // Gọi repository để lấy danh sách sản phẩm có phân trang
        return $this->productRepository->getAllProducts($perPage);
    }

    public function search($params)
    {
        if (!empty($params['categories'])) {
            $params['categories'] = explode(',', $params['categories']);
            // Kiểm tra xem các giá trị trong categories có phải là số không
            $params['categories'] = array_map('intval', $params['categories']);
        }
        return $this->productRepository->search($params);
    }

    public function findBySlug($id)
    {
        return $this->productRepository->findBySlug($id);
    }

    public function getProductByType($type = "high-rated")
    {
        return $this->productRepository->getProductByType($type);
    }

    public function getRelatedProducts($slug)
    {
        return $this->productRepository->related($slug);
    }
}
