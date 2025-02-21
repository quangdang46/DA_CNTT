<?php

namespace App\Http\Controllers;

use App\Services\DiscountService;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    protected $discountService;

    public function __construct(DiscountService $discountService)
    {
        $this->discountService = $discountService;
    }
    // Tạo mới mã giảm giá
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|string|unique:discounts',
            'amount' => 'required|numeric|min:0',
            'is_percentage' => 'boolean',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'in:active,expired,inactive',
        ]);

        $discount = $this->discountService->createDiscount($data);
        return response()->json($discount, 201);
    }

    // Lấy danh sách tất cả mã giảm giá
    public function index()
    {
        $discounts = $this->discountService->getAllDiscounts();
        return response()->json($discounts);
    }

    // Lấy chi tiết một mã giảm giá
    public function show($id)
    {
        $discount = $this->discountService->getDiscountById($id);

        if (!$discount) {
            return response()->json(['message' => 'Discount not found'], 404);
        }

        return response()->json($discount);
    }

    // Cập nhật mã giảm giá
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'code' => 'string|unique:discounts,code,' . $id,
            'amount' => 'numeric|min:0',
            'is_percentage' => 'boolean',
            'start_date' => 'date',
            'end_date' => 'date|after:start_date',
            'status' => 'in:active,expired,inactive',
        ]);

        $discount = $this->discountService->updateDiscount($id, $data);

        if (!$discount) {
            return response()->json(['message' => 'Discount not found'], 404);
        }

        return response()->json($discount);
    }

    // Xóa mã giảm giá
    public function destroy($id)
    {
        $result = $this->discountService->deleteDiscount($id);

        if (!$result) {
            return response()->json(['message' => 'Discount not found'], 404);
        }

        return response()->json(['message' => 'Discount deleted successfully']);
    }
}
