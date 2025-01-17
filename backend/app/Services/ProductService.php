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

    public function getAllProducts($perPage = 15)
    {
        // Gọi repository để lấy danh sách sản phẩm có phân trang
        return $this->productRepository->getAllProducts($perPage);
    }

    public function search($params)
    {
        return $this->productRepository->search($params);
    }

    public function findById($id)
    {
        return $this->productRepository->findById($id);
    }

    public function getNewProducts()
    {
        return $this->productRepository->getNewProducts();
    }
}
