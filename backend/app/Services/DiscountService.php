<?php

namespace App\Services;

use App\Models\Discount;
use App\Models\Order;
use App\Models\Product;
use App\Repositories\Interfaces\DiscountRepositoryInterface;
use App\Repositories\Interfaces\OrderDiscountRepositoryInterface;
use App\Repositories\Interfaces\ProductDiscountRepositoryInterface;

class DiscountService
{
    protected $discountRepository;
    protected $orderDiscountRepository;
    protected $productDiscountRepository;

    public function __construct(
        DiscountRepositoryInterface $discountRepository,
        OrderDiscountRepositoryInterface $orderDiscountRepository,
        ProductDiscountRepositoryInterface $productDiscountRepository
    ) {
        $this->discountRepository = $discountRepository;
        $this->orderDiscountRepository = $orderDiscountRepository;
        $this->productDiscountRepository = $productDiscountRepository;
    }

    public function createDiscount(array $data)
    {
        return $this->discountRepository->create($data);
    }

    public function getAllDiscounts()
    {
        return $this->discountRepository->all();
    }

    public function getDiscountById($id)
    {
        return $this->discountRepository->find($id);
    }

    public function updateDiscount($id, array $data)
    {
        return $this->discountRepository->update($id, $data);
    }

    public function deleteDiscount($id)
    {
        return $this->discountRepository->delete($id);
    }





    /**
     * Áp dụng mã giảm giá cho đơn hàng hoặc sản phẩm.
     */
    public function applyDiscount($discountCode, $targetType, $targetId)
    {
        // Bước 1: Kiểm tra mã giảm giá
        $discount = $this->validateDiscountCode($discountCode);

        // Bước 2: Xác định mục tiêu (đơn hàng hoặc sản phẩm)
        if ($targetType === 'order') {
            return $this->applyToOrder($discount, $targetId);
        } elseif ($targetType === 'product') {
            return $this->applyToProduct($discount, $targetId);
        }

        throw new \Exception('Loại mục tiêu không hợp lệ');
    }

    /**
     * Kiểm tra tính hợp lệ của mã giảm giá.
     */
    private function validateDiscountCode($code)
    {
        $discount = Discount::where('code', $code)
            ->where('status', 'active')
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->first();

        if (!$discount) {
            throw new \Exception('Mã giảm giá không hợp lệ hoặc đã hết hạn');
        }

        return $discount;
    }

    /**
     * Áp dụng mã giảm giá cho đơn hàng.
     */
    private function applyToOrder($discount, $orderId)
    {
        $order = Order::find($orderId);
        if (!$order) {
            throw new \Exception('Đơn hàng không tồn tại');
        }

        // Tính toán số tiền giảm
        $totalAmount = $order->total_amount;
        $discountAmount = $this->calculateDiscountAmount($discount, $totalAmount);

        // Lưu thông tin vào bảng order_discounts
        $orderDiscount = $this->orderDiscountRepository->create([
            'order_id' => $order->id,
            'discount_id' => $discount->id,
            'discount_amount' => $discountAmount,
            'discount_type' => $discount->is_percentage ? 'percentage' : 'fixed',
        ]);

        // Cập nhật tổng giá trị đơn hàng
        $newTotalAmount = $totalAmount - $discountAmount;
        $order->update(['total_amount' => $newTotalAmount]);

        return [
            'message' => 'Mã giảm giá đã được áp dụng thành công cho đơn hàng',
            'order' => $order,
            'discount' => $orderDiscount,
        ];
    }

    /**
     * Áp dụng mã giảm giá cho sản phẩm.
     */
    private function applyToProduct($discount, $productId)
    {
        $product = Product::find($productId);
        if (!$product) {
            throw new \Exception('Sản phẩm không tồn tại');
        }

        // Tính toán số tiền giảm
        $price = $product->price;
        $discountAmount = $this->calculateDiscountAmount($discount, $price);

        // Lưu thông tin vào bảng product_discounts
        $productDiscount = $this->productDiscountRepository->create([
            'product_id' => $product->id,
            'discount_id' => $discount->id,
            'amount' => $discountAmount,
            'start_date' => now(),
            'end_date' => $discount->end_date,
            'status' => 'active',
        ]);

        // Cập nhật giá sản phẩm
        $newPrice = $price - $discountAmount;
        $product->update(['price' => $newPrice]);

        return [
            'message' => 'Mã giảm giá đã được áp dụng thành công cho sản phẩm',
            'product' => $product,
            'discount' => $productDiscount,
        ];
    }

    /**
     * Tính toán số tiền giảm dựa trên loại giảm giá.
     */
    private function calculateDiscountAmount($discount, $amount)
    {
        return $discount->is_percentage
            ? ($amount * $discount->amount) / 100
            : $discount->amount;
    }
}
