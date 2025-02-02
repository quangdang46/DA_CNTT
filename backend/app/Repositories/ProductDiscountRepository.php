<?php

namespace App\Repositories;

use App\Models\ProductDiscount;
use App\Repositories\Interfaces\ProductDiscountRepositoryInterface;

class ProductDiscountRepository implements ProductDiscountRepositoryInterface
{
    protected $productDiscount;

    public function __construct(ProductDiscount $productDiscount)
    {
        $this->productDiscount = $productDiscount;
    }

    // Tạo mới giảm giá cho sản phẩm
    public function create(array $data)
    {
        return $this->productDiscount->create($data);
    }

    // Lấy tất cả giảm giá đã áp dụng cho sản phẩm
    public function all()
    {
        return $this->productDiscount->all();
    }

    // Lấy giảm giá của một sản phẩm cụ thể
    public function findByProductId($product_id)
    {
        return $this->productDiscount->where('product_id', $product_id)->get();
    }

    // Cập nhật giảm giá cho sản phẩm
    public function update($id, array $data)
    {
        $productDiscount = $this->productDiscount->find($id);
        if ($productDiscount) {
            $productDiscount->update($data);
            return $productDiscount;
        }
        return null;
    }

    // Xóa giảm giá khỏi sản phẩm
    public function delete($id)
    {
        $productDiscount = $this->productDiscount->find($id);
        if ($productDiscount) {
            $productDiscount->delete();
            return true;
        }
        return false;
    }
}
