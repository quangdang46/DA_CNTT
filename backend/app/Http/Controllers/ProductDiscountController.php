<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductDiscountService;

class ProductDiscountController extends Controller
{
    protected $productDiscountService;

    public function __construct(ProductDiscountService $productDiscountService)
    {
        $this->productDiscountService = $productDiscountService;
    }

    // Áp dụng mã giảm giá cho sản phẩm
    public function store(Request $request)
    {
        // $data = $request->validate([
        //     'product_id' => 'required|exists:products,id',
        //     'discount_id' => 'required|exists:discounts,id',
        //     'amount' => 'required|numeric|min:0',
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date|after:start_date',
        //     'status' => 'in:active,expired,inactive',
        // ]);

        $data = $request->all();
        $productDiscount = $this->productDiscountService->createProductDiscount($data);
        return response()->json($productDiscount, 201);
    }

    // Lấy danh sách giảm giá đã áp dụng cho sản phẩm
    public function index()
    {
        $productDiscounts = $this->productDiscountService->getAllProductDiscounts();
        return response()->json($productDiscounts);
    }

    // Lấy giảm giá của một sản phẩm cụ thể
    public function show($product_id)
    {
        $productDiscounts = $this->productDiscountService->getProductDiscountsByProductId($product_id);
        return response()->json($productDiscounts);
    }

    // Cập nhật giảm giá cho sản phẩm
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'amount' => 'numeric|min:0',
            'start_date' => 'date',
            'end_date' => 'date|after:start_date',
            'status' => 'in:active,expired,inactive',
        ]);

        $productDiscount = $this->productDiscountService->updateProductDiscount($id, $data);

        if (!$productDiscount) {
            return response()->json(['message' => 'Product discount not found'], 404);
        }

        return response()->json($productDiscount);
    }

    // Xóa giảm giá khỏi sản phẩm
    public function destroy($id)
    {
        $result = $this->productDiscountService->deleteProductDiscount($id);

        if (!$result) {
            return response()->json(['message' => 'Product discount not found'], 404);
        }

        return response()->json(['message' => 'Product discount deleted successfully']);
    }
}
