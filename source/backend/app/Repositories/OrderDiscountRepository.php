<?php

namespace App\Repositories;

use App\Models\OrderDiscount;
use App\Repositories\Interfaces\OrderDiscountRepositoryInterface;

class OrderDiscountRepository implements OrderDiscountRepositoryInterface
{
    protected $orderDiscount;

    public function __construct(OrderDiscount $orderDiscount)
    {
        $this->orderDiscount = $orderDiscount;
    }

    // Tạo mới giảm giá cho đơn hàng
    public function create(array $data)
    {
        return $this->orderDiscount->create($data);
    }

    // Lấy tất cả giảm giá đã áp dụng cho đơn hàng
    public function all()
    {
        return $this->orderDiscount->all();
    }

    // Lấy giảm giá của một đơn hàng cụ thể
    public function findByOrderId($order_id)
    {
        return $this->orderDiscount->where('order_id', $order_id)->get();
    }

    // Cập nhật giảm giá cho đơn hàng
    public function update($id, array $data)
    {
        $orderDiscount = $this->orderDiscount->find($id);
        if ($orderDiscount) {
            $orderDiscount->update($data);
            return $orderDiscount;
        }
        return null;
    }

    // Xóa giảm giá khỏi đơn hàng
    public function delete($id)
    {
        $orderDiscount = $this->orderDiscount->find($id);
        if ($orderDiscount) {
            $orderDiscount->delete();
            return true;
        }
        return false;
    }
}
