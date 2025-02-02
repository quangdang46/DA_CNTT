<?php

namespace App\Services;

use App\Repositories\Interfaces\ProductDiscountRepositoryInterface;

class ProductDiscountService
{
    protected $productDiscountRepository;

    public function __construct(ProductDiscountRepositoryInterface $productDiscountRepository)
    {
        $this->productDiscountRepository = $productDiscountRepository;
    }

    // Tạo mới giảm giá cho sản phẩm
    public function createProductDiscount(array $data)
    {
        return $this->productDiscountRepository->create($data);
    }

    // Lấy tất cả giảm giá đã áp dụng cho sản phẩm
    public function getAllProductDiscounts()
    {
        return $this->productDiscountRepository->all();
    }

    // Lấy giảm giá của một sản phẩm cụ thể
    public function getProductDiscountsByProductId($product_id)
    {
        return $this->productDiscountRepository->findByProductId($product_id);
    }

    // Cập nhật giảm giá cho sản phẩm
    public function updateProductDiscount($id, array $data)
    {
        return $this->productDiscountRepository->update($id, $data);
    }

    // Xóa giảm giá khỏi sản phẩm
    public function deleteProductDiscount($id)
    {
        return $this->productDiscountRepository->delete($id);
    }
}
