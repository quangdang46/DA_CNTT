<?php

namespace App\Services;

use App\Repositories\Interfaces\OrderDiscountRepositoryInterface;

class OrderDiscountService
{
    protected $orderDiscountRepository;

    public function __construct(OrderDiscountRepositoryInterface $orderDiscountRepository)
    {
        $this->orderDiscountRepository = $orderDiscountRepository;
    }

    // Tạo mới giảm giá cho đơn hàng
    public function createOrderDiscount(array $data)
    {
        return $this->orderDiscountRepository->create($data);
    }

    // Lấy tất cả giảm giá đã áp dụng cho đơn hàng
    public function getAllOrderDiscounts()
    {
        return $this->orderDiscountRepository->all();
    }

    // Lấy giảm giá của một đơn hàng cụ thể
    public function getOrderDiscountsByOrderId($order_id)
    {
        return $this->orderDiscountRepository->findByOrderId($order_id);
    }

    // Cập nhật giảm giá cho đơn hàng
    public function updateOrderDiscount($id, array $data)
    {
        return $this->orderDiscountRepository->update($id, $data);
    }

    // Xóa giảm giá khỏi đơn hàng
    public function deleteOrderDiscount($id)
    {
        return $this->orderDiscountRepository->delete($id);
    }
}
