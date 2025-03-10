<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DiscountService;

class ApplyDiscountController extends Controller
{
    protected $discountService;

    public function __construct(DiscountService $discountService)
    {
        $this->discountService = $discountService;
    }

    /**
     * Áp dụng mã giảm giá cho đơn hàng hoặc sản phẩm.
     */
    public function applyDiscount(Request $request)
    {
        $data = $request->validate([
            'discount_code' => 'required|string',
            'target_type' => 'required|in:order,product', // Loại mục tiêu: đơn hàng hoặc sản phẩm
            'target_id' => 'required', // ID của mục tiêu string hoặc int
        ]);

        try {
            $result = $this->discountService->applyDiscount(
                $data['discount_code'],
                $data['target_type'],
                $data['target_id']
            );

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
