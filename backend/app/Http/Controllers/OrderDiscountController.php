<?php

namespace App\Http\Controllers;

use App\Services\OrderDiscountService;
use Illuminate\Http\Request;

class OrderDiscountController extends Controller
{

    protected $orderDiscountService;

    public function __construct(OrderDiscountService $orderDiscountService)
    {
        $this->orderDiscountService = $orderDiscountService;
    }

    // Áp dụng mã giảm giá cho đơn hàng
    public function store(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'discount_id' => 'required|exists:discounts,id',
            'discount_amount' => 'required|numeric|min:0',
            'discount_type' => 'in:percentage,fixed',
        ]);

        $orderDiscount = $this->orderDiscountService->createOrderDiscount($data);
        return response()->json($orderDiscount, 201);
    }

    // Lấy danh sách giảm giá đã áp dụng cho đơn hàng
    public function index()
    {
        $orderDiscounts = $this->orderDiscountService->getAllOrderDiscounts();
        return response()->json($orderDiscounts);
    }

    // Lấy giảm giá của một đơn hàng cụ thể
    public function show($order_id)
    {
        $orderDiscounts = $this->orderDiscountService->getOrderDiscountsByOrderId($order_id);
        return response()->json($orderDiscounts);
    }

    // Cập nhật giảm giá cho đơn hàng
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'discount_amount' => 'numeric|min:0',
            'discount_type' => 'in:percentage,fixed',
        ]);

        $orderDiscount = $this->orderDiscountService->updateOrderDiscount($id, $data);

        if (!$orderDiscount) {
            return response()->json(['message' => 'Order discount not found'], 404);
        }

        return response()->json($orderDiscount);
    }

    // Xóa giảm giá khỏi đơn hàng
    public function destroy($id)
    {
        $result = $this->orderDiscountService->deleteOrderDiscount($id);

        if (!$result) {
            return response()->json(['message' => 'Order discount not found'], 404);
        }

        return response()->json(['message' => 'Order discount deleted successfully']);
    }
}
